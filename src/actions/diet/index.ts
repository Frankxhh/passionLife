'use server';

import { db } from '@/server/db';
import { withAuth } from '../middleware/auth';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import {
  type DietRecord,
  type DietRecordItemWithFood,
  type DietRecordSchema,
  dietRecordSchema,
  type DietRecordStatistics,
  type FoodListItem,
  type Foods,
  type MealType,
} from './type';
import { revalidatePath, unstable_cache } from 'next/cache';
import dayjs from 'dayjs';
import { round, add } from 'mathjs';
const createFoodsItem = (item: Foods) => {
  return {
    id: item.id,
    imgUrl: item.imgUrl,
    title: item.title,
    calories: item.calories,
    unit: item.unit,
    carbs: item.carbs,
    protein: item.protein,
    fat: item.fat,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};
// 获取食物列表
export const getFoodList = withAuth<void, ServerResponse<FoodListItem[] | null>>(async () => {
  return handleServerAction(async () => {
    const getCachedFoodList = unstable_cache(
      async () => {
        const foodList = await db.foodList.findMany();
        return foodList.reduce((result: FoodListItem[], item) => {
          const findItem = result.find(resultItem => resultItem.category === item.category);
          if (findItem) {
            findItem.foods.push(createFoodsItem(item));
          } else {
            result.push({
              category: item.category,
              categoryName: item.categoryName,
              foods: [createFoodsItem(item)],
            });
          }
          return result;
        }, []);
      },
      ['foodList'], // 缓存键
      {
        revalidate: 24 * 60 * 60, // 缓存 24 小时
        tags: ['food-list'], // 用于手动使缓存失效的标签
      },
    );
    return await getCachedFoodList();
  });
});
// 获取食物详情
export const getFoodDetail = withAuth<string, ServerResponse<Foods | null>>(async (userId, foodId) => {
  return handleServerAction(async () => {
    return await db.foodList.findUnique({ where: { id: foodId } });
  });
});

// 添加饮食记录
export const addDietAction = withAuth<DietRecordSchema, ServerResponse<void>>(async (userId, data) => {
  return handleServerAction(async () => {
    const result = dietRecordSchema.safeParse(data);
    if (!result.success) {
      throw new Error('Invalid input data');
    }
    await db.userDietRecord.create({
      data: {
        userId,
        ...data,
        carbs: round(data.carbs, 2),
        protein: round(data.protein, 2),
        fat: round(data.fat, 2),
      },
    });
    // 保存训练数据
    revalidatePath('/diet');
  });
});
// 获取今日饮食记录

export const getDietRecord = withAuth<void, ServerResponse<DietRecord | null>>(async userId => {
  return handleServerAction(async () => {
    const dietRecords = await db.$queryRaw<DietRecordItemWithFood[]>`
      SELECT 
        udr.*,
        fl."imgUrl",
        fl."title"
      FROM "UserDietRecord" udr
      LEFT JOIN "FoodList" fl ON udr."foodId" = fl.id
      WHERE udr."userId" = ${userId}
        AND udr."createdAt" >= ${dayjs().startOf('day').toDate()}
        AND udr."createdAt" <= ${dayjs().endOf('day').toDate()}
    `;
    const initDietRecord: DietRecord = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    const dietRecord = dietRecords.reduce((result, item) => {
      result[item.mealType as MealType] = [...result[item.mealType as MealType], item];
      return result;
    }, initDietRecord);
    return dietRecord;
  });
});

// 获取今日饮食统计图表(碳水/蛋白质/脂肪)

export const getDietRecordChart = withAuth<void, ServerResponse<DietRecordStatistics | null>>(async userId => {
  return handleServerAction(async () => {
    const dietRecords = await db.userDietRecord.findMany({
      where: { userId, createdAt: { gte: dayjs().startOf('day').toDate(), lte: dayjs().endOf('day').toDate() } },
    });
    const initDietRecordChart: DietRecordStatistics = {
      carbs: 0,
      protein: 0,
      fat: 0,
      servingSize: 0,
    };
    return dietRecords.reduce((result, item) => {
      result.carbs = round(add(result.carbs, item.carbs), 2);
      result.protein = round(add(result.protein, item.protein), 2);
      result.fat = round(add(result.fat, item.fat), 2);
      result.servingSize = round(add(result.servingSize, item.servingSize), 2);
      return result;
    }, initDietRecordChart);
  });
});
