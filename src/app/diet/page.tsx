import { getFoodList, getDietRecord } from '@/actions/diet';
import DietChart from '@/components/diet/DietChart';
import DietRecord from '@/components/diet/DietRecord';
import DietSheet from '@/components/diet/DietSheet';

const DietPage = async () => {
  const foodListRes = await getFoodList();
  // const dietRecordRes = await getDietRecord();

  return (
    <div className="container mx-auto max-w-2xl">
      <DietChart />
      <DietRecord />
      <DietSheet foodList={foodListRes?.data ?? []} />
    </div>
  );
};
export default DietPage;
