import { auth } from '@clerk/nextjs/server';

export type AuthenticatedHandler<T, R> = (userId: string, ...args: T[]) => Promise<R>;
/**
 * 身份验证高阶函数包装器
 * @template T - 处理函数的参数类型
 * @template R - 处理函数的返回值类型,默认为void
 * @param handler - 需要进行身份验证的处理函数
 * @returns 包装后的函数,会自动进行身份验证检查
 * @throws {Error} 当用户未登录时抛出Unauthorized错误
 */

export const withAuth = <T, R = void>(handler: AuthenticatedHandler<T, R>) => {
  return async (...args: T[]): Promise<R> => {
    const { userId } = await auth();
    if (!userId) {
      window.location.reload();
      return Promise.reject(new Error('Unauthorized'));
    }
    return handler(userId, ...args);
  };
};
