import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
const DietRecord = () => {
  return (
    <>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="mb-2 flex justify-between">
            <div>晚餐</div>
            <div className="text-sm text-muted-foreground">165卡路里</div>
          </div>
          {/* 摄入食物列表 */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between pr-4">
              <div className="flex flex-row items-center gap-2">
                <div className="rounded-xl border p-2">
                  <Image src="/image/food.png" alt="晚餐" width={24} height={24} />
                </div>
                <div>鸡胸肉</div>
              </div>
              <div>165</div>
            </div>
            <div className="flex flex-row items-center justify-between pr-4">
              <div className="flex flex-row items-center gap-2">
                <div className="rounded-xl border p-2">
                  <Image src="/image/food.png" alt="晚餐" width={24} height={24} />
                </div>
                <div>鸡胸肉</div>
              </div>
              <div>165</div>
            </div>
            <div className="flex flex-row items-center justify-between pr-4">
              <div className="flex flex-row items-center gap-2">
                <div className="rounded-xl border p-2">
                  <Image src="/image/food.png" alt="晚餐" width={24} height={24} />
                </div>
                <div>鸡胸肉</div>
              </div>
              <div>165</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DietRecord;
