import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getTodayTrainingAction } from '@/actions/training';
import { Suspense } from 'react';
import TrainingHeader from '@/components/training/TrainingHeader';
import TrainingRecord from '@/components/training/TrainingRecord';
const Training = async () => {
  const trainingInfo = await getTodayTrainingAction();
  return (
    <div className={'h-full w-full'}>
      {/* 训练头部信息 */}
      <TrainingHeader />

      {/* 今日训练 */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold">今日训练记录</h1>
        <Link href="/training/addTraining">
          <Button>
            <Plus size={16} />
            添加训练
          </Button>
        </Link>
      </div>
      <TrainingRecord trainingInfo={trainingInfo.data} />
      {/* 训练列表 */}
    </div>
  );
};
export default function Page() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Training />
    </Suspense>
  );
}
