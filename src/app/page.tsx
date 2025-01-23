import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PhysicalData from '@/components/home/PhysicalData';
import WeightTrendsChart from '@/components/home/WeightTrendsChart';
import TargetCard from '@/components/home/TargetCard';
import { getUserInfoAction, getUserWeekTrendAction } from '@/actions/user';
import { getUserTargetAction } from '@/actions/userTarget';
import FallBack from '@/components/home/FallBack';

function Fallback() {
  return <Skeleton className="h-[180px] w-full" />;
}

export interface TargetListItem {
  key: string;
  title: string;
  description: string;
}

const targetList: TargetListItem[] = [
  {
    key: 'training',
    title: '训练目标',
    description: '训练计划',
  },
  {
    key: 'diet',
    title: '营养统计',
    description: '饮食成就',
  },
];

const ProfilePage = async () => {
  const userInfo = await getUserInfoAction();
  const userWeekTrend = await getUserWeekTrendAction();
  const userTarget = await getUserTargetAction();
  return (
    <div className={'h-full w-full p-4'}>
      <Card className={'mb-4 bg-gradient-to-b from-[#69B1FF] to-[#1677ff] text-white'}>
        <CardContent className={'px-4 pb-4 pt-2'}>
          <PhysicalData userInfo={userInfo.data ?? null} message={userInfo.message} />
        </CardContent>
      </Card>
      <Card className={'mb-4'}>
        <CardHeader className={'px-4 py-4 pb-0'}>
          <CardTitle className={'flex justify-between'}>
            <span>趋势</span>
            <span>周报</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={'p-4 py-0'}>
          <WeightTrendsChart userWeekTrend={userWeekTrend.data ?? null} message={userWeekTrend.message} />
        </CardContent>
      </Card>
      {targetList.map(item => (
        <TargetCard key={item.title} targetItem={item} userTarget={userTarget.data ?? null} />
      ))}
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<FallBack />}>
      <ProfilePage />
    </Suspense>
  );
}
