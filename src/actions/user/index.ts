'use server';

import { withAuth } from '../middleware/auth';
import {
  editUserInfoSchema,
  type GetUserInfoSchema,
  type EditUserInfoSchema,
  type GetUserWeekTrendSchema,
  type GetUserWeekTrendSchemaItem,
  GetUserTodayStatisticsSchema,
} from './type';
import { handleServerAction, type ServerResponse } from '../middleware/response';
import { db } from '@/server/db';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { round } from 'mathjs';
// 获取用户信息
export const getUserInfoAction = withAuth<void, ServerResponse<GetUserInfoSchema | null>>(async userId => {
  return handleServerAction(async () => {
    // 获取用户当前最新一条信息(如果今日没有记录，则获取昨天的记录/界面上显示为昨日信息)
    const userInfo = await db.userInfoHistory.findFirst({
      where: {
        userId,
      },
      orderBy: { recordedAt: 'desc' },
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

    if (!userInfo) {
      return null;
    }
    // 判断是否为今天
    const isToday = dayjs(userInfo.recordedAt).isSame(dayjs(), 'day');
    const recordedAt = isToday
      ? dayjs(userInfo.recordedAt).format('HH:mm')
      : dayjs(userInfo.recordedAt).format('YYYY-MM-DD HH:mm');
    const compare = isToday && yesterdayRecord ? (userInfo?.weight ?? 0) - (yesterdayRecord?.weight ?? 0) : null;

    return {
      ...userInfo,
      recordedAt,
      compare,
    };
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

    // 记录历史数据
    await db.userInfoHistory.create({
      data: {
        userId,
        weight: result.data.weight,
        bmi: result.data.bmi,
        height: result.data.height,
      },
    });
    revalidatePath('/');
  });
});

// 获取用户一周身体趋势
export const getUserWeekTrendAction = withAuth<void, ServerResponse<GetUserWeekTrendSchema | null>>(async userId => {
  return handleServerAction(async () => {
    // 获取本周的开始和结束时间
    const startOfWeek = dayjs().startOf('week');
    const endOfWeek = dayjs().endOf('week');

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

    if (!records.length) {
      return null;
    }

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

// 获取用户今日运动/饮食等指标统计
export const getUserTodayStatisticsAction = withAuth<void, ServerResponse<GetUserTodayStatisticsSchema | null>>(
  async userId => {
    return handleServerAction(async () => {
      const today = dayjs().startOf('day').toDate();
      const endOfDay = dayjs().endOf('day').toDate();

      // 查询今日运动记录
      const trainingRecords = await db.training.findMany({
        where: {
          userId,
          createdAt: {
            gte: today,
            lte: endOfDay,
          },
        },
      });

      // 查询今日饮食记录
      const dietRecords = await db.userDietRecord.findMany({
        where: {
          userId,
          createdAt: {
            gte: today,
            lte: endOfDay,
          },
        },
      });

      return {
        duration: round(trainingRecords.reduce((acc, record) => acc + record.duration, 0) / 60, 2),
        servingSize: round(
          dietRecords.reduce((acc, record) => acc + record.servingSize, 0),
          2,
        ),
        // water: dietRecords.reduce((acc, record) => acc + record.water, 0),
      };
    });
  },
);
