'use server';

import { db } from '@/server/db';
import { withAuth } from '../middleware/auth';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import { type FoodListItem, type Foods } from './type';

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
  });
});
// 获取食物详情
export const getFoodDetail = withAuth<string, ServerResponse<Foods | null>>(async (userId, foodId) => {
  return handleServerAction(async () => {
    return await db.foodList.findUnique({ where: { id: foodId } });
  });
});
