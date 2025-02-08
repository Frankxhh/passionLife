'use server';

import { withAuth } from '../middleware/auth';

import { handleServerAction, type ServerResponse } from '../middleware/response';
import { db } from '@/server/db';
import { type GetTodayTrainingRes, type TrainingStatistics, trainingFormSchema, type TrainingSchema } from './type';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

// 查询今日训练记录
export const getTodayTrainingAction = withAuth<void, ServerResponse<GetTodayTrainingRes | null>>(async userId => {
  return handleServerAction(async () => {
    const training = await db.training.findMany({
      where: { userId, createdAt: { gte: dayjs().startOf('day').toDate(), lte: dayjs().endOf('day').toDate() } },
    });
    const records = training
      ? training.map(item => ({
          ...item,
          createdAt: dayjs(item.createdAt).format('HH:mm:ss'),
        }))
      : null;
    // 计算统计数据
    const statistics: TrainingStatistics = {
      trainingCount: records?.length ?? 0,
      totalCalories: records?.reduce((sum, item) => sum + item.calories, 0) ?? 0,
      totalDuration: records?.reduce((sum, item) => sum + item.duration, 0) ?? 0,
      totalActions:
        records?.reduce(
          (sum, item) => sum + (item.type === 'anaerobic' ? (item.groupCount ?? 0) * (item.exhaustionCount ?? 0) : 0),
          0,
        ) ?? 0,
    };
    return {
      records,
      statistics,
    };
  });
});

// 添加训练
export const addTrainingAction = withAuth<TrainingSchema, ServerResponse<void>>(async (userId, data) => {
  return handleServerAction(async () => {
    // 验证输入数据
    const result = trainingFormSchema.safeParse(data);
    if (!result.success) {
      throw new Error('Invalid input data');
    }
    await db.training.create({
      data: {
        userId,
        ...data,
      },
    });
    // 保存训练数据
    revalidatePath('/training');
  });
});
