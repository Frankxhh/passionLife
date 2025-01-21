'use client';
import { useToast } from './use-toast';
import { useEffect } from 'react';

export const useHandleClientResponse = (message: string | null) => {
  const { toast } = useToast();

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        variant: 'destructive',
      });
    }
  }, [message]);
};
