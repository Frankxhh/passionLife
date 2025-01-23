import { z } from 'zod';

// 定义表单验证schema
export const targetFormSchema = z.object({
  weeklyTrainingTarget: z.coerce.number().min(1, '每周训练次数至少为1次').max(7, '每周训练次数最多7次'),
  weeklyDietTarget: z.coerce.number().min(1, '每周饮食达标次数至少为1次').max(7, '每周饮食达标次数最多7次'),
  targetWeight: z.coerce.number().min(30, '目标体重不能低于30kg').max(200, '目标体重不能超过200kg'),
  targetBMI: z.coerce.number().min(18.5, 'BMI不能低于18.5').max(24.9, 'BMI不能超过24.9'),
});

export type TargetFormSchema = z.infer<typeof targetFormSchema>;

// 获取用户目标的返回类型
export interface GetUserTargetSchema {
  userId: string;
  weeklyTrainingTarget: number;
  weeklyDietTarget: number;
  targetWeight: number;
  targetBMI: number;
}
