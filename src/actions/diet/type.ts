import { z } from 'zod';

// 食物清单
export interface Foods {
  id: string;
  imgUrl: string;
  title: string;
  calories: number;
  unit: string;
  carbs: number;
  protein: number;
  fat: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodListItem {
  category: string;
  categoryName: string;
  foods: Foods[];
}

// 添加饮食记录
export const dietRecordSchema = z.object({
  foodId: z.string(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  totalCalories: z.number(),
  servingSize: z.coerce.number(),
  carbs: z.coerce.number(),
  protein: z.coerce.number(),
  fat: z.coerce.number(),
});

export type DietRecordSchema = z.infer<typeof dietRecordSchema>;

// 饮食记录
export interface DietRecordItem {
  id: string;
  userId: string;
  foodId: string;
  carbs: number;
  protein: number;
  fat: number;
  mealType: string;
  servingSize: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface DietRecordItemWithFood extends DietRecordItem {
  imgUrl: string;
  title: string;
  totalCalories: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type DietRecord = Record<MealType, DietRecordItemWithFood[]>;

export interface DietRecordStatistics {
  carbs: number;
  protein: number;
  fat: number;
  servingSize: number;
}
