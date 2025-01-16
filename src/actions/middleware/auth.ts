import { auth } from '@clerk/nextjs/server';

export type AuthenticatedHandler<T, R> = (userId: string, ...args: T[]) => Promise<R>;

export const withAuth = <T, R = void>(handler: AuthenticatedHandler<T, R>) => {
  return async (...args: T[]): Promise<R> => {
    const { userId } = await auth();
    if (!userId) {
      await auth.protect();
      throw new Error('Unauthorized');
    }
    return handler(userId, ...args);
  };
};
