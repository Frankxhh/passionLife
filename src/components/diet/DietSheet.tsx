import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { type FoodListItem } from '@/actions/diet/type';
import Image from 'next/image';
import Link from 'next/link';

interface DietSheetProps {
  foodList: FoodListItem[];
}

const DietSheet = ({ foodList }: DietSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full rounded-2xl border-emerald-800 py-5 text-emerald-800">
          <Plus />
          添加食物
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>食物清单</SheetTitle>
          <SheetDescription>选择你想要添加的食物</SheetDescription>
        </SheetHeader>
        {/* 食物搜索 */}
        <Command className="my-4 rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="添加或搜索食物..." />
          <CommandList>
            <CommandEmpty>暂无数据</CommandEmpty>
            {/* 列表 */}
            {foodList.map(foodItem => (
              <CommandGroup heading={foodItem.categoryName} key={foodItem.category}>
                {foodItem.foods.map(food => (
                  <Link href={`/diet/addDiet?foodId=${food.id}`} key={food.id}>
                    <CommandItem key={food.id}>
                      <Image className="rounded-xl" src={food.imgUrl} alt={food.title} width={40} height={40} />
                      <span>{food.title}</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {food.calories}千卡/{food.unit}
                      </span>
                      {/* <CommandShortcut>⌘A</CommandShortcut> */}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <SheetFooter>
          <SheetClose asChild>
            <Button>取消</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DietSheet;
