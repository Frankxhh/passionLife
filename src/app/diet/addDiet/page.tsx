'use client';

import { getFoodDetail } from '@/actions/diet';
import { type Foods } from '@/actions/diet/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';
import { Label } from '@/components/ui/label';
import ButtonGroup from '@/components/ButtonGroup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { timeButtons, nutritionReducer, initialState } from '@/components/diet/addDiet';
import { useRouter } from 'next/navigation';
const AddDietPage = () => {
  const searchParams = useSearchParams();
  const foodId = searchParams.get('foodId');
  const [foodDetail, setFoodDetail] = useState<Foods | null>(null);
  const [time, setTime] = useState<string>(timeButtons[0]!.key);
  const [servingSize, setServingSize] = useState<number>(0);
  //碳水/蛋白质/脂肪
  const [nutritionState, dispatch] = useReducer(nutritionReducer, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (foodId) {
      getFoodDetail(foodId).then(res => {
        setFoodDetail(res?.data ?? null);
      });
    }
  }, [foodId]);

  const handleTimeChange = (time: string) => {
    setTime(time);
  };

  const handleChangeServingSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setServingSize(Number(value));
    dispatch({
      type: 'UPDATE_NUTRITION',
      payload: {
        servingSize: Number(value),
        baseNutrition: {
          carbsPercent: foodDetail?.carbs ?? 0,
          proteinPercent: foodDetail?.protein ?? 0,
          fatPercent: foodDetail?.fat ?? 0,
        },
      },
    });
  };

  const handleAddDiet = () => {
    if (servingSize === 0) {
      toast({
        title: '请输入食物份量',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: '添加成功',
    });
    // 返回
    router.back();
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Link href="/diet">
        <Button variant="ghost">
          <ArrowLeft size={16} />
          返回
        </Button>
      </Link>
      {foodDetail?.imgUrl && (
        <div className="mb-4 flex items-center rounded-md border p-4">
          <Image
            className="mr-4 rounded-xl"
            src={foodDetail?.imgUrl ?? ''}
            alt={foodDetail?.title ?? 'food'}
            width={40}
            height={40}
          />
          <span className="text-sm font-medium leading-none">{foodDetail?.title}</span>
          <span className="ml-auto text-sm text-muted-foreground">
            {foodDetail?.calories}千卡/{foodDetail?.unit}
          </span>
        </div>
      )}
      {/* 时间 */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>选择您的餐次:</CardTitle>
        </CardHeader>
        <CardContent>
          <ButtonGroup buttons={timeButtons} time={time} handleTimeChange={handleTimeChange} />
        </CardContent>
      </Card>
      {/* 份量 */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            输入您的份量:
            <Input value={servingSize} onChange={handleChangeServingSize} className="w-20" type="number" />
            <span className="text-sm text-muted-foreground">克</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex flex-col gap-2">
            <Label>碳水</Label>
            <Input disabled type="number" value={nutritionState.carbs} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>蛋白质</Label>
            <Input disabled type="number" value={nutritionState.protein} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>脂肪</Label>
            <Input disabled type="number" value={nutritionState.fat} />
          </div>
        </CardContent>
      </Card>
      {/* 上次吃过 */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>上次吃过:</CardTitle>
        </CardHeader>
        <CardContent>
          {foodDetail?.imgUrl && (
            <div className="mb-4 flex items-center rounded-md border p-4">
              <Image
                className="mr-4 rounded-xl"
                src={foodDetail?.imgUrl ?? ''}
                alt={foodDetail?.title ?? 'food'}
                width={40}
                height={40}
              />
              <span className="text-sm font-medium leading-none">{foodDetail?.title}</span>
              <span className="ml-auto text-sm text-muted-foreground">100克</span>
            </div>
          )}
        </CardContent>
      </Card>
      {/* 添加 */}
      <Button onClick={handleAddDiet} className="w-full" variant="default">
        添加
      </Button>
    </div>
  );
};

export default AddDietPage;
