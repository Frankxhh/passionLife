'use client';
import Image from 'next/image';
const Empty = () => {
  return (
    <div className="pb-4 text-center">
      <Image
        className={'h-auto w-full'}
        width={0}
        height={0}
        src={`/image/empty.png`}
        sizes="100vw"
        alt={'暂无数据'}
        priority
      />
    </div>
  );
};
export default Empty;
