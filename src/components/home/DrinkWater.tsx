'use client';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const DrinkWater = () => {
  const [water, setWater] = useState(0);
  return (
    <Card className={'relative mt-4'}>
      <CardContent className={'p-4'}>
        <div className={'mb-2 flex flex-row items-center justify-between'}>
          <div className={'flex flex-row items-center'}>
            <Image className="mr-2" src={'/image/water.png'} alt={'饮水量'} width={24} height={24} />
            <span>今日已饮水</span>
          </div>
          <div className={'flex flex-row items-baseline justify-between'}>
            <span className={'mr-2 text-2xl'}>{water}</span>
            <span className={'mr-4 text-sm text-gray-400'}>毫升</span>
            <Button size="icon" onClick={() => setWater(water + 100)}>
              <Plus />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrinkWater;
