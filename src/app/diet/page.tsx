import { getFoodList } from '@/actions/diet';
import DietChart from '@/components/diet/DietChart';
import DietRecord from '@/components/diet/DietRecord';
import DietSheet from '@/components/diet/DietSheet';

const DietPage = async () => {
  const foodListRes = await getFoodList();

  return (
    <div>
      <DietChart />
      <DietRecord />
      <DietSheet foodList={foodListRes?.data ?? []} />
    </div>
  );
};
export default DietPage;
