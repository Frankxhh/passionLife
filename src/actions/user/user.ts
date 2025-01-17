'use server';

import { withAuth } from '../middleware/auth';
import { editUserInfoSchema, type EditUserInfoSchema } from './type';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import { db } from '@/server/db';

// 编辑用户信息
export const editUserInfoAction = withAuth<EditUserInfoSchema, ServerResponse<void>>(async (userId, data) => {
  return handleServerAction(async () => {
    // 验证输入数据
    const result = editUserInfoSchema.safeParse(data);
    if (!result.success) {
      throw new Error('Invalid input data');
    }

    // 执行更新操作 若该用户不存在则进行新增
    const updatedUser = await db.userInfo.upsert({
      where: {
        id: userId,
      },
      update: result.data, // 使用验证后的数据
      create: {
        ...result.data,
        id: userId,
      },
    });

    if (!updatedUser) {
      throw new Error('Failed to update user info');
    }
  });
});
