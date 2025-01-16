'use server';

import prisma from '@/lib/prisma';
import { withAuth } from '../middleware/auth';
import { EditUserInfoSchema } from './type';

// 编辑用户信息
export const editUserInfo = withAuth<EditUserInfoSchema>(async (userId, data) => {
  await prisma.userInfo.update({
    where: {
      id: userId,
    },
    data,
  });
});
