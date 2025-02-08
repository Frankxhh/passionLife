'use client';
import { type alreadyItem } from '@/app/page';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

const AlerayCard: React.FC<{ alreadyItem: alreadyItem }> = ({ alreadyItem }) => {
  return (
    <Card className={'relative mt-4'}>
      <CardContent className={'p-4'}>
        <div className={'mb-2 flex flex-row items-center justify-between'}>
          <div className={'flex flex-row items-center'}>
            <Image
              className="mr-2"
              src={`/image/${alreadyItem.icon}.png`}
              alt={alreadyItem.title}
              width={24}
              height={24}
            />
            <span>今日已{alreadyItem.title}</span>
          </div>
          <div className={'flex flex-row items-baseline justify-between'}>
            <span className={'mr-2 text-2xl'}>1000</span>
            <span className={'text-sm text-gray-400'}>{alreadyItem.unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlerayCard;
