'use client';

import { useUser } from '@clerk/nextjs';
import SetTarget from './SetTarget';
import { UserButton } from '@clerk/nextjs';
import ToggleMode from '@/components/Theme/ToggleMode';
import { useCallback, useEffect, useState } from 'react';
import { type GetUserTargetSchema } from '@/actions/userTarget/type';
import { getUserTargetAction } from '@/actions/userTarget';
import { useToast } from '@/hooks/use-toast';
import { CircleAlert } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';
const BreadContent: React.FC = () => {
  const { user } = useUser();
  const [userTarget, setUserTarget] = useState<GetUserTargetSchema | null>(null);
  const { toast } = useToast();
  const toGetUserTarget = useCallback(async () => {
    if (user?.id) {
      getUserTargetAction()
        .then(res => {
          setUserTarget(res.data ?? null);
        })
        .catch(err => {
          toast({
            title: err.message,
            variant: 'destructive',
          });
        });
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      toGetUserTarget();
    }
  }, [user]);

  return (
    <div className="flex flex-1 flex-row items-center justify-between gap-2">
      {user?.id && <SetTarget userTarget={userTarget} toGetUserTarget={toGetUserTarget} />}
      {!userTarget && (
        <Popover>
          <PopoverTrigger asChild>
            <CircleAlert size={18} className="mt-1 text-red-500" />
          </PopoverTrigger>
          <PopoverContent align="center" sideOffset={10}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-red-500">检测到您未设置目标</h4>
                <p className="text-sm text-muted-foreground">请设置目标，以便更好地跟踪您的进度。</p>
              </div>
            </div>
            <PopoverArrow width={12} height={10} className="fill-white stroke-[hsl(var(--border))] stroke-[2]" />
          </PopoverContent>
        </Popover>
      )}
      <div className={'ml-auto flex items-center gap-2'}>
        <ToggleMode />
        <UserButton />
        <span>{user?.username}</span>
      </div>
    </div>
  );
};
export default BreadContent;
