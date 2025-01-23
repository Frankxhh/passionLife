'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { targetFormSchema, type TargetFormSchema } from '@/actions/userTarget/type';
import { getUserTargetAction, setUserTargetAction } from '@/actions/userTarget';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const SetTarget = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      getUserTargetAction()
        .then(res => {
          form.reset({
            weeklyTrainingTarget: res.data?.weeklyTrainingTarget ?? 3,
            weeklyDietTarget: res.data?.weeklyDietTarget ?? 5,
            targetWeight: res.data?.targetWeight ?? 65,
            targetBMI: res.data?.targetBMI ?? 22,
          });
        })
        .catch(err => {
          toast({
            title: err.message,
            variant: 'destructive',
          });
        });
    }
  }, [open]);
  const form = useForm<TargetFormSchema>({
    resolver: zodResolver(targetFormSchema),
    defaultValues: {
      weeklyTrainingTarget: 3,
      weeklyDietTarget: 5,
      targetWeight: 65,
      targetBMI: 22,
    },
  });

  const onSubmit = async (data: TargetFormSchema) => {
    await setUserTargetAction(data);
    setOpen(false);
    toast({
      title: '保存成功',
    });
  };

  return (
    <Drawer open={open} onOpenChange={open => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button variant="outline">设置目标</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>设置目标</DrawerTitle>
            <DrawerDescription>在这里设置下你的目标，让我们一起努力吧！</DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
              <FormField
                control={form.control}
                name="weeklyTrainingTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>每周训练目标（次）</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weeklyDietTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>每周饮食达标目标（次）</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>目标体重（kg）</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetBMI"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>目标BMI</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit">保存目标</Button>
                <DrawerClose asChild>
                  <Button variant="outline">取消</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SetTarget;
