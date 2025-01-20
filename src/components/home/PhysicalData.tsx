'use client';
import { Badge } from '@/components/ui/badge';
import { UserRoundPen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useHandleClientResponse } from '@/hooks/use-response';
import { editUserInfoAction, getUserInfoAction } from '@/actions/user';
import { type EditUserInfoSchema, editUserInfoSchema, type GetUserInfoSchema } from '@/actions/user/type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const EditDialog: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toGetUserInfo: () => void;
}> = ({ open, setOpen, toGetUserInfo }) => {
  const handleClientResponse = useHandleClientResponse();

  const form = useForm({
    defaultValues: {
      height: 0,
      weight: 0,
      bmi: 0,
    },
    resolver: zodResolver(editUserInfoSchema),
  });

  const handleSubmit = async (data: EditUserInfoSchema) => {
    await handleClientResponse(
      editUserInfoAction({
        height: data.height,
        weight: data.weight,
        bmi: data.bmi,
      }),
      {
        showSuccessMessage: true,
        successMessage: '保存成功',
      },
    );
    toGetUserInfo();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑身体数据</DialogTitle>
          <DialogDescription>在这里更新您的身高体重信息</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="height" className="text-right">
                    身高(cm)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="weight" className="text-right">
                    体重(kg)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bmi"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="bmi" className="text-right">
                    BMI
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(handleSubmit)} disabled={form.formState.isSubmitting}>
            保存更改
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PhysicalData = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClientResponse = useHandleClientResponse();

  useEffect(() => {
    toGetUserInfo();
  }, []);

  const [userInfo, setUserInfo] = useState<GetUserInfoSchema | null>(null);

  const toGetUserInfo = async () => {
    await handleClientResponse<GetUserInfoSchema | null>(getUserInfoAction()).then(res => {
      setUserInfo(res);
    });
  };
  return (
    <>
      <div className={'relative mb-2 flex h-32 flex-row items-end px-1'}>
        <div onClick={() => setIsOpen(true)} className="absolute right-0 top-0 rounded p-1">
          <UserRoundPen />
        </div>
        {/*体重*/}
        <div className={'flex flex-1 flex-col'}>
          <div className={'flex'}>
            <span className={'text-[4rem]'}>{userInfo?.weight ?? '-'}</span>
            <span className={'ml-1 mt-4'}>公斤</span>
          </div>
          <span className={'text-sm'}>今天 08:52</span>
        </div>
        {/*对比昨天*/}
        <div className={'mr-14 flex flex-col items-center'}>
          <span className={'mb-[0.5rem] text-right text-[2rem]'}>{userInfo?.compare ?? '-'}</span>
          <span className={'text-sm opacity-60'}>对比昨天(kg)</span>
        </div>
      </div>
      {/* 细节信息 */}
      <div className={'flex gap-8 rounded-xl bg-[#69B1FF] px-4 py-2'}>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-end'}>
            <span className={'mr-1'}>身高</span>
            <Badge className={'text-xs'}>正常</Badge>
          </div>
          <span>{userInfo?.height ?? '-'}cm</span>
        </div>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-end'}>
            <span className={'mr-1'}>BMI</span>
            <Badge className={'text-xs'}>正常</Badge>
          </div>
          <span>{userInfo?.bmi ?? '-'}</span>
        </div>
      </div>
      <EditDialog open={isOpen} setOpen={setIsOpen} toGetUserInfo={toGetUserInfo} />
    </>
  );
};
export default PhysicalData;
