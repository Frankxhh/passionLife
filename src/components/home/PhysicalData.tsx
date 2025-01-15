'use client';
import { Badge } from '@/components/ui/badge';

const PhysicalData = () => {
  return (
    <>
      <div className={'mb-2 flex h-32 flex-row items-end px-1'}>
        {/*体重*/}
        <div className={'flex flex-1 flex-col'}>
          <div className={'flex'}>
            <span className={'ml-[-0.5rem] text-[4rem] tracking-[-0.2rem]'}>130</span>
            <span className={'ml-1 mt-4'}>斤</span>
          </div>
          <span className={'text-sm'}>今天 08:52</span>
        </div>
        {/*对比昨天*/}
        <div className={'mr-20 flex flex-col'}>
          <span className={'mb-[0.5rem] text-right text-[2rem]'}>0.8</span>
          <span className={'text-sm opacity-60'}>对比昨天</span>
        </div>
      </div>
      <div className={'flex gap-8 rounded-xl bg-[#69B1FF] px-4 py-2'}>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-end'}>
            <span className={'mr-1'}>身高</span>
            <Badge className={'text-xs'}>正常</Badge>
          </div>
          <span>210cm</span>
        </div>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-end'}>
            <span className={'mr-1'}>BMI</span>
            <Badge className={'text-xs'}>正常</Badge>
          </div>
          <span>20.3</span>
        </div>
      </div>
    </>
  );
};
export default PhysicalData;
