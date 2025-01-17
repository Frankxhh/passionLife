'use client';
import { type ServerResponse } from '@/actions/middleware/response';
import { useToast } from './use-toast';
import { useCallback } from 'react';

export const useHandleClientResponse = <T,>() => {
  const { toast } = useToast();

  return useCallback(
    async (
      promise: Promise<ServerResponse<T>>,
      options?: {
        showSuccessMessage?: boolean;
        successMessage?: string;
        showErrorMessage?: boolean;
      },
    ): Promise<T | null> => {
      const { showSuccessMessage = false, showErrorMessage = true, successMessage } = options ?? {};

      try {
        const response = await promise;
        if (response.success) {
          if (showSuccessMessage) {
            toast({
              title: successMessage ?? response.message,
            });
          }
          return response.data ?? null;
        } else {
          if (showErrorMessage) {
            toast({
              title: response.message,
              variant: 'destructive',
            });
          }
          return null;
        }
      } catch (error) {
        toast({
          title: '请求失败，请稍后重试',
          variant: 'destructive',
        });
        return null;
      }
    },
    [toast],
  );
};
