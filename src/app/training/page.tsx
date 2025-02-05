import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
const Training = () => {
  return (
    <div className={'h-full w-full p-4'}>
      {/* 本周训练目标 */}
      <Card className="mb-6 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold">本周训练目标</h2>
              <p>已完成 1/2 次训练</p>
            </div>
            <div className="relative h-20 w-20">
              <Image src="/image/exercise.png" alt="training" width={80} height={80} className="rounded-xl" />
            </div>
          </div>
          <Progress className="mt-4 h-2" value={50} />
        </div>
      </Card>
      {/* 训练记录 */}
      <div>
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
        {/* 训练列表 */}
        <div className="container mx-auto mt-4 max-w-2xl">
          <Suspense fallback={<div>加载中...</div>}>
            <div className="space-y-4">
              <Card className="flex flex-row items-center space-x-4 p-4">
                <div>
                  <Image src="/svg/muscles.svg" alt="training" width={80} height={80} className="rounded-xl" />
                </div>
                <CardContent className="flex-1 items-center p-0">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">力量训练</CardTitle>
                    <div className="text-sm text-muted-foreground">今天 14:30</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">训练时长: 45分钟</p>
                      <p className="text-sm text-muted-foreground">强度: ⭐⭐⭐</p>
                    </div>
                    <div className="text-2xl font-bold">
                      320
                      <span className="ml-1 text-sm font-normal">千卡</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-row items-center space-x-4 p-4">
                <div className="relative">
                  <Image src="/image/running.png" width={80} height={80} alt="training" className="rounded-xl" />
                </div>
                <CardContent className="flex-1 items-center p-0">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">有氧训练</CardTitle>
                    <div className="text-sm text-muted-foreground">今天 14:30</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">训练时长: 45分钟</p>
                      <p className="text-sm text-muted-foreground">强度: ⭐⭐⭐</p>
                    </div>
                    <div className="text-2xl font-bold">
                      320
                      <span className="ml-1 text-sm font-normal">千卡</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Training;
