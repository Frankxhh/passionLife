import { Skeleton } from '../ui/skeleton';

const FallBack = () => {
  return (
    <div className="h-full w-full space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
};
export default FallBack;
