import { z } from 'zod';

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
});

export type EditUserInfoSchema = z.infer<typeof editUserInfoSchema>;

// 查询用户信息的返回类型
export interface GetUserInfoSchema {
  id: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  compare: number | null;
  createdAt: Date;
  updatedAt: Date;
}
