export type ServerResponse<T = any> = {
  code: number;
  success: boolean;
  message: string | null;
  data?: T | null;
};

export const handleServerAction = async <T>(action: () => Promise<T>): Promise<ServerResponse<T>> => {
  try {
    const result = await action();
    return {
      code: 200,
      success: true,
      message: null,
      data: result,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: error instanceof Error ? error.message : '操作失败',
      data: null,
    };
  }
};
