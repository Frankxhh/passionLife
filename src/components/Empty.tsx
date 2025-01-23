'use client';
import Image from 'next/image';
const Empty = () => {
  return (
    <div className="flex h-full w-full items-center justify-center pb-4 text-center">
      <Image
        className={'h-auto w-full md:max-w-md'}
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
