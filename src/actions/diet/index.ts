'use server';

import { db } from '@/server/db';
import { withAuth } from '../middleware/auth';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import { DietRecord, type DietRecordSchema, dietRecordSchema, type FoodListItem, type Foods, MealType } from './type';
import { revalidatePath, unstable_cache } from 'next/cache';
import dayjs from 'dayjs';

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
      },
    });
    // 保存训练数据
    revalidatePath('/diet');
  });
});
// 获取今日饮食记录
const initDietRecord: DietRecord = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};
export const getDietRecord = withAuth<void, ServerResponse<DietRecord | null>>(async userId => {
  return handleServerAction(async () => {
    const dietRecords = await db.userDietRecord.findMany({
      where: { userId, createdAt: { gte: dayjs().startOf('day').toDate(), lte: dayjs().endOf('day').toDate() } },
    });
    const dietRecord = dietRecords.reduce((result, item) => {
      result[item.mealType as MealType] = [...result[item.mealType as MealType], item];
      return result;
    }, initDietRecord);
    return dietRecord;
  });
});
