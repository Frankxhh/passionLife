'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { type TargetListItem } from '@/app/page';
import Image from 'next/image';
import { type GetUserTargetSchema } from '@/actions/userTarget/type';

interface TargetCardProps {
  targetItem: TargetListItem;
  userTarget: GetUserTargetSchema | null;
}

// 定义目标字段映射
const targetDict: Record<string, keyof GetUserTargetSchema> = {
  training: 'weeklyTrainingTarget',
  diet: 'weeklyDietTarget',
} as const;

const TargetCard: React.FC<TargetCardProps> = ({ targetItem, userTarget }) => {
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Card className={'relative mt-4'}>
      <CardHeader className={'p-4'}>
        <CardTitle>{targetItem.title}</CardTitle>
        <CardDescription>
          已完成2/{userTarget?.[targetDict[targetItem.key]!] ?? '-'}次{targetItem.description}
        </CardDescription>
      </CardHeader>
      <CardContent className={'flex items-center gap-4 px-4'}>
        <div className={'mb-2'}>
          <span className={'text-2xl'}>50</span>
          <span className={'text-xs'}>%</span>
        </div>
        <Progress value={progress} className="" />
      </CardContent>
      <Image
        className={'absolute bottom-0 right-0'}
        width={100}
        height={100}
        src={`/image/${targetItem.key}.png`}
        alt={''}
        priority
      />
    </Card>
  );
};
export default TargetCard;
