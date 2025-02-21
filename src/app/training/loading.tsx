import { Skeleton } from '@/components/ui/skeleton';

const TrainingLoading = () => {
  return (
    <div className={'flex h-full w-full flex-col space-y-3'}>
      <Skeleton className="h-[170px] w-full rounded-xl" />
      <div className="flex flex-row justify-between gap-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
};
export default TrainingLoading;
