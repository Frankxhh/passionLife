import { auth } from '@clerk/nextjs/server';

export type AuthenticatedHandler<T, R> = (userId: string, ...args: T[]) => Promise<R>;

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
