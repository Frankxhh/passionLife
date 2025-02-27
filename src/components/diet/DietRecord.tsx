import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { type DietRecordItemWithFood, type MealType, type DietRecord } from '@/actions/diet/type';
import { timeButtons } from './addDiet';

interface DietRecordProps {
  dietRecordRes?: DietRecord | null;
}

const getCurrentButton = (key: MealType) => {
  return timeButtons.find(item => item.key === key)!.label;
};

const getCalories = (dietRecordRes: DietRecordItemWithFood[]) => {
  return dietRecordRes.reduce((acc, item) => acc + item.servingSize, 0);
};

const DietRecord = ({ dietRecordRes }: DietRecordProps) => {
  return (
    <div className="flex flex-col gap-4">
      {dietRecordRes &&
        Object.entries(dietRecordRes).map(([key, dietRecordRes]) => {
          console.log(key);
          return (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>{getCurrentButton(key as MealType)}</div>
                  <div className="text-sm text-muted-foreground">{getCalories(dietRecordRes)}千卡</div>
                </div>
                {/* 摄入食物列表 */}
                <div className="flex flex-col gap-2">
                  {dietRecordRes.length > 0 ? (
                    dietRecordRes.map(item => {
                      return (
                        <div key={item.id} className="flex flex-row items-center justify-between pr-4">
                          <div className="flex flex-row items-center gap-2">
                            <div className="rounded-xl border p-2">
                              <Image src={item.imgUrl} alt={item.title} width={24} height={24} />
                            </div>
                            <div>{item.title}</div>
                          </div>
                          <div>{item.servingSize}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-12 text-center text-sm leading-[3rem] text-muted-foreground">暂无数据</div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default DietRecord;
