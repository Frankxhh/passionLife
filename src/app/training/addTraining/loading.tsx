import { Spin } from '@/components/Spin';

const AddTrainingLoading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <Spin />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
};
export default AddTrainingLoading;
