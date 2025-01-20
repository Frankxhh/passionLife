'use server';

import { withAuth } from '../middleware/auth';
import { editUserInfoSchema, type GetUserInfoSchema, type EditUserInfoSchema } from './type';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import { db } from '@/server/db';

// 获取用户信息
export const getUserInfoAction = withAuth<void, ServerResponse<GetUserInfoSchema | null>>(async userId => {
  return handleServerAction(async () => {
    const userInfo = await db.userInfo.findUnique({
      where: { id: userId },
    });
    return userInfo;
  });
});

// 编辑用户信息
export const editUserInfoAction = withAuth<EditUserInfoSchema, ServerResponse<void>>(async (userId, data) => {
  return handleServerAction(async () => {
    // 验证输入数据
    const result = editUserInfoSchema.safeParse(data);
    if (!result.success) {
      throw new Error('Invalid input data');
    }

    // 使用事务同时更新用户信息和记录历史数据
    await db.$transaction(async tx => {
      // 更新用户信息
      await tx.userInfo.upsert({
        where: {
          id: userId,
        },
        update: result.data,
        create: {
          ...result.data,
          id: userId,
        },
      });

      // 记录历史数据
      await tx.userInfoHistory.create({
        data: {
          userId,
          weight: result.data.weight,
          bmi: result.data.bmi,
        },
      });
    });
  });
});
