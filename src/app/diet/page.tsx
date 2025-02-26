import { getFoodList, getDietRecord, getDietRecordChart } from '@/actions/diet';
import DietChart from '@/components/diet/DietChart';
import DietRecord from '@/components/diet/DietRecord';
import DietSheet from '@/components/diet/DietSheet';
import { ScrollArea } from '@/components/ui/scroll-area';

const DietPage = async () => {
  const foodListRes = await getFoodList();
  const dietRecordRes = await getDietRecord();
  const dietRecordChartRes = await getDietRecordChart();

  // 图表数据统计
  const dietData = dietRecordChartRes?.data || { carbs: 0, protein: 0, fat: 0 };
  const dietRecordChartStatisticsSum = dietData.carbs + dietData.protein + dietData.fat;

  const dietRecordChartStatisticsPercent =
    dietRecordChartStatisticsSum === 0
      ? { carbs: '-', protein: '-', fat: '-' }
      : {
          carbs: `${((dietData.carbs / dietRecordChartStatisticsSum) * 100).toFixed(2)}%`,
          protein: `${((dietData.protein / dietRecordChartStatisticsSum) * 100).toFixed(2)}%`,
          fat: `${((dietData.fat / dietRecordChartStatisticsSum) * 100).toFixed(2)}%`,
        };

  return (
    <div className="container mx-auto max-w-2xl">
      <ScrollArea className="h-[calc(100vh-160px)]">
        <DietChart
          dietRecordChartRes={dietRecordChartRes?.data}
          dietRecordChartStatisticsPercent={dietRecordChartStatisticsPercent}
        />
        <DietRecord dietRecordRes={dietRecordRes?.data} />
      </ScrollArea>

      <DietSheet foodList={foodListRes?.data ?? []} />
    </div>
  );
};
export default DietPage;
