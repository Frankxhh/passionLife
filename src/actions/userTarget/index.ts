'use server';

import { db } from '@/server/db';
import { withAuth } from '../middleware/auth';
import { type ServerResponse, handleServerAction } from '../middleware/response';
import { type GetUserTargetSchema, targetFormSchema, type TargetFormSchema } from './type';
import { revalidatePath } from 'next/cache';

// 设置用户目标
export const setUserTargetAction = withAuth<TargetFormSchema, ServerResponse<void>>(async (userId, data) => {
  return handleServerAction(async () => {
    const result = targetFormSchema.safeParse(data);
    if (!result.success) {
      throw new Error('Invalid input data');
    }

    await db.userTarget.upsert({
      where: { userId },
      update: {
        ...result.data,
      },
      create: {
        userId,
        ...result.data,
      },
    });
    revalidatePath('/');
  });
});

// 获取用户目标
export const getUserTargetAction = withAuth<void, ServerResponse<GetUserTargetSchema | null>>(async userId => {
  return handleServerAction(async () => {
    const userTarget = await db.userTarget.findUnique({
      where: {
        userId,
      },
    });
    if (!userTarget) {
      return null;
    }
    return userTarget;
  });
});
