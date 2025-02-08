'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Clock, Flame } from 'lucide-react';
import { addTrainingAction } from '@/actions/training';
import { trainingFormSchema, type TrainingFormSchema } from '@/actions/training/type';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface TrainingFormProps {
  type: 'aerobics' | 'anaerobic';
}

const TrainingForm = ({ type }: TrainingFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TrainingFormSchema>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      type,
      name: '',
      duration: 0,
      calories: 0,
      groupCount: 0,
      exhaustionCount: 0,
      weight: 0,
      description: '',
    },
  });
  const handleSubmit = async (data: TrainingFormSchema) => {
    try {
      if (type === 'anaerobic') {
        // 无氧运动必须包含组数、力竭次数和重量
        if (!data.groupCount || !data.exhaustionCount || !data.weight) {
          throw new Error('无氧运动必须填写组数、力竭次数和重量');
        }
        await addTrainingAction({
          ...data,
          type: 'anaerobic',
          groupCount: data.groupCount,
          exhaustionCount: data.exhaustionCount,
          weight: data.weight,
        });
      } else {
        // 有氧运动不需要这些字段
        await addTrainingAction({
          type: 'aerobics',
          name: data.name,
          duration: data.duration,
          calories: data.calories,
          description: data.description,
        });
      }

      toast({
        title: '保存成功',
      });
      router.push('/training');
    } catch (error) {
      toast({
        title: '保存失败',
        description: error instanceof Error ? error.message : '未知错误',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* 训练名称 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>训练名称</FormLabel>
              <FormControl>
                <Input type="text" placeholder="请输入训练名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 训练时长 */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>训练时长(分钟)</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    className="flex-1"
                    min={0}
                    max={180}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                  <span className="w-4 text-center text-sm text-muted-foreground">{field.value}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 消耗卡路里 */}
        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>消耗卡路里</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    className="flex-1"
                    min={0}
                    max={1000}
                    step={10}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                  <span className="w-4 text-center text-sm text-muted-foreground">{field.value} </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === 'anaerobic' && (
          <div>
            {/* 训练组数和训练重量 */}
            <div className="mb-4 flex gap-4">
              <FormField
                control={form.control}
                name="groupCount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>训练组数</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="请输入组数" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>训练重量(kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="请输入重量" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="exhaustionCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>最大力竭次数</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="请输入最大力竭次数" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* 训练描述 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>训练描述</FormLabel>
              <FormControl>
                <Textarea placeholder="请输入训练描述" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          提交
        </Button>
      </form>
    </Form>
  );
};

export default TrainingForm;
