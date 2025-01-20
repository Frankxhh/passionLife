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

const SetTarget = () => {
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
    // TODO: 实现保存目标的逻辑
    console.log(data);
  };

  return (
    <Drawer>
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
                      <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
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
                      <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
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
                      <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
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
                      <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
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
