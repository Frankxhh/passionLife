import { type GetTodayTrainingSchema } from '@/actions/training/type';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
const TrainingRecord = ({ trainingInfo }: { trainingInfo?: GetTodayTrainingSchema[] | null }) => {
  return (
    <div className="container mx-auto mt-4 max-w-2xl">
      <div className="space-y-4">
        {trainingInfo?.length ? (
          trainingInfo?.map(training => (
            <Card className="flex flex-row items-center space-x-4 p-4" key={training.id}>
              <div className="relative">
                {training.type === 'aerobics' ? (
                  <Image src="/image/running.png" width={80} height={80} alt="training" className="rounded-xl" />
                ) : (
                  <Image src="/svg/muscles.svg" width={80} height={80} alt="training" className="rounded-xl" />
                )}
              </div>
              <CardContent className="flex-1 items-center p-0">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">{training.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{training.createdAt}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">训练时长: {training.duration}分钟</p>
                    {/* 组数/重量/力竭次数 */}
                    {training.type === 'anaerobic' && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          组数-重量: {training.groupCount}×{training.weight}kg
                        </p>
                        <p className="text-sm font-bold">最大力竭次数: {training.exhaustionCount}</p>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">强度: ⭐⭐⭐</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {training.calories}
                      <span className="ml-1 text-sm font-normal">千卡</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Image
            className={'h-auto w-full md:max-w-md'}
            width={0}
            height={0}
            src={`/image/fat.png`}
            sizes="100vw"
            alt={'暂无数据'}
            priority
          />
        )}
      </div>
    </div>
  );
};

export default TrainingRecord;
