import { Card } from '../ui/card';
import Image from 'next/image';
import { type TrainingStatistics } from '@/actions/training/type';

const TrainingHeader = ({ statistics }: { statistics?: TrainingStatistics }) => {
  return (
    <Card className="mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="grid flex-1 grid-cols-2 items-center gap-4 text-white">
            <div className="rounded-xl bg-gradient-to-br from-primary/90 to-primary p-2 text-primary-foreground">
              <h1 className="text-sm">今日训练</h1>
              <p className="text-sm opacity-90">
                <span className="text-xl font-bold">{statistics?.trainingCount ?? 0}</span>
                <span className="text-sm opacity-90">次</span>
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500/90 to-orange-500 p-2">
              <h1 className="text-sm">消耗热量</h1>
              <p className="text-sm opacity-90">
                <span className="text-xl font-bold">{statistics?.totalCalories ?? 0}</span>
                <span className="text-sm opacity-90">千卡</span>
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-500 p-2">
              <h1 className="text-sm">训练时长</h1>
              <p className="text-sm opacity-90">
                <span className="text-xl font-bold">{statistics?.totalDuration ?? 0}</span>
                <span className="text-sm opacity-90">分钟</span>
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500/90 to-purple-500 p-2">
              <h1 className="text-sm">完成动作</h1>
              <p className="text-sm opacity-90">
                <span className="text-xl font-bold">{statistics?.totalActions ?? 0}</span>
                <span className="text-sm opacity-90">次</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <Image src="/image/exercise.png" alt="training" width={80} height={80} className="rounded-xl" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrainingHeader;
