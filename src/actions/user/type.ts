import { z } from 'zod';
import { type ChartData } from '../baseType';

export const editUserInfoSchema = z.object({
  height: z.coerce
    .number()
    .min(100, {
      message: '身高不能小于100cm',
    })
    .max(300, {
      message: '身高不能超过300cm',
    }),
  weight: z.coerce
    .number()
    .min(10, {
      message: '体重不能小于10kg',
    })
    .max(500, {
      message: '体重不能超过500kg',
    }),
  bmi: z.coerce.number().min(1, { message: 'BMI必须大于0' }).max(100, { message: 'BMI不能超过100' }),
});

export type EditUserInfoSchema = z.infer<typeof editUserInfoSchema>;

// 查询用户信息的返回类型
export interface GetUserInfoSchema {
  id: string;
  userId: string;
  height: number;
  weight: number;
  bmi: number;
  compare: number | null;
  recordedAt: string;
  updatedAt: Date;
}

// 查询用户一周身体数据趋势
export interface GetUserWeekTrendSchemaItem {
  id: string;
  userId: string;
  weight: number;
  bmi: number;
  recordedAt: Date;
}
export type GetUserWeekTrendSchema = {
  weight: ChartData;
  bmi: ChartData;
};

// 获取用户今日运动/饮食等指标统计
export interface GetUserTodayStatisticsSchema {
  duration: number;
  servingSize: number;
  // water: number;
}
