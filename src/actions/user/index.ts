'use server';

import { withAuth } from '../middleware/auth';
import {
  editUserInfoSchema,
  type GetUserInfoSchema,
  type EditUserInfoSchema,
  type GetUserWeekTrendSchema,
  type GetUserWeekTrendSchemaItem,
} from './type';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import { db } from '@/server/db';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
// 获取用户信息
export const getUserInfoAction = withAuth<void, ServerResponse<GetUserInfoSchema | null>>(async userId => {
  return handleServerAction(async () => {
    // 获取用户当前信息
    const userInfo = await db.userInfo.findUnique({
      where: { id: userId },
    });

    // 获取昨天的历史记录
    const yesterdayRecord = await db.userInfoHistory.findFirst({
      where: {
        userId,
        recordedAt: {
          gte: dayjs().subtract(1, 'day').startOf('day').toDate(),
          lte: dayjs().subtract(1, 'day').endOf('day').toDate(),
        },
      },
      orderBy: {
        recordedAt: 'desc',
      },
    });

    // 如果找到昨天的记录，计算差值
    if (userInfo && yesterdayRecord) {
      userInfo.compare = userInfo.weight - yesterdayRecord.weight;
    }

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
      revalidatePath('/');
    });
  });
});

// 获取用户一周身体趋势
export const getUserWeekTrendAction = withAuth<void, ServerResponse<GetUserWeekTrendSchema | null>>(async userId => {
  return handleServerAction(async () => {
    // 获取本周的开始和结束时间
    const startOfWeek = dayjs().startOf('week').add(1, 'day');
    const endOfWeek = dayjs().endOf('week').add(1, 'day');

    // 查询本周每天最后一条记录
    const records = await db.$queryRaw<GetUserWeekTrendSchemaItem[]>`
      WITH RankedRecords AS (
        SELECT *,
          DATE("recordedAt") as "recordDate",
          ROW_NUMBER() OVER (PARTITION BY DATE("recordedAt") ORDER BY "recordedAt" DESC) as "rn"
        FROM "UserInfoHistory"
        WHERE "userId" = ${userId}
          AND "recordedAt" >= ${startOfWeek.toDate()}
          AND "recordedAt" <= ${endOfWeek.toDate()}
      )
      SELECT * FROM RankedRecords WHERE rn = 1
      ORDER BY "recordDate" ASC
    `;

    const currentWeekData = (type: 'weight' | 'bmi') => {
      // 创建完整的一周数据
      const fullWeekData = Array.from({ length: 7 }, (_, index) => {
        const currentDate = startOfWeek.add(index, 'day');
        const record = records.find(r => dayjs(r.recordedAt).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD'));

        const dayMap = ['日', '一', '二', '三', '四', '五', '六'];
        return {
          // 格式化为周几
          date: currentDate.toDate(),
          value: record ? (type === 'weight' ? record.weight : record.bmi) : null,
          viewName: dayMap[currentDate.day()]!,
        };
      });
      const validValues = fullWeekData.map(item => item.value).filter((value): value is number => value !== null);
      return {
        maxValue: validValues.length ? Math.max(...validValues) : 0,
        minValue: validValues.length ? Math.min(...validValues) : 0,
        statics: fullWeekData,
      };
    };

    return {
      weight: currentWeekData('weight'),
      bmi: currentWeekData('bmi'),
    };
  });
});
