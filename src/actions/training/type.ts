import { z } from 'zod';

// 创建基础字段 schema
const baseTrainingSchema = z.object({
  name: z.string().min(1, '训练名称不能为空'),
  duration: z.coerce.number().min(1, '训练时长不能为0'),
  calories: z.coerce.number().min(0, '消耗卡路里不能为负数'),
  description: z.string().optional(),
});

// 有氧运动 schema
const aerobicsTrainingSchema = baseTrainingSchema.extend({
  type: z.literal('aerobics'),
  // 有氧运动不需要这些字段，所以设置为可选
  groupCount: z.coerce.number().optional(),
  exhaustionCount: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
});

// 无氧运动 schema
const anaerobicTrainingSchema = baseTrainingSchema.extend({
  type: z.literal('anaerobic'),
  // 无氧运动需要这些字段，所以设置为必填
  groupCount: z.coerce.number().min(1, '训练组数不能为0'),
  exhaustionCount: z.coerce.number().min(1, '力竭次数不能为0'),
  weight: z.coerce.number().min(1, '重量不能为0'),
});

// 合并两种类型
export const trainingFormSchema = z.discriminatedUnion('type', [aerobicsTrainingSchema, anaerobicTrainingSchema]);

export type TrainingFormSchema = z.infer<typeof trainingFormSchema>;
export type TrainingSchema = TrainingFormSchema & { type: 'aerobics' | 'anaerobic' };

// 获取今日训练记录的返回类型
export interface GetTodayTrainingSchema {
  id: string;
  userId: string;
  name: string;
  duration: number;
  calories: number;
  type: string;
  groupCount: number | null;
  exhaustionCount: number | null;
  weight: number | null;
  description: string | null;
  createdAt: string;
  updatedAt: Date;
}
