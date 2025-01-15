'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { type TargetListItem } from '@/app/page';
import Image from 'next/image';

const TargetCard: React.FC = ({ targetItem }: TargetListItem) => {
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Card className={'relative mb-4'}>
      <CardHeader className={'p-4'}>
        <CardTitle>{targetItem.title}</CardTitle>
        <CardDescription>已完成2/4次{targetItem.title.description}</CardDescription>
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
