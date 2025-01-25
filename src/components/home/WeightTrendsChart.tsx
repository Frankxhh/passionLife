'use client';
import { type GetUserWeekTrendSchema } from '@/actions/user/type';
import { useHandleClientResponse } from '@/hooks/use-response';
import ReactECharts from 'echarts-for-react';
import Empty from '../Empty';
interface WeightTrendsChartProps {
  userWeekTrend: GetUserWeekTrendSchema | null;
  message: string | null;
}
const WeightTrendsChart: React.FC<WeightTrendsChartProps> = ({ userWeekTrend, message }) => {
  useHandleClientResponse(message);
  if (!userWeekTrend) {
    return <Empty />;
  }
  const options = {
    legend: {
      data: ['体重', 'BMI'],
      top: 0,
    },
    grid: { top: 20, right: 0, bottom: 24, left: 0 },
    xAxis: {
      type: 'category',
      data: userWeekTrend?.weight.statics.map(item => item.viewName),
      axisTick: {
        show: false, // 隐藏 Y 轴刻度线
      },

      axisLine: {
        show: false, // 隐藏X轴轴线
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false, // 隐藏 Y 轴刻度线
      },
      axisLabel: {
        show: false, // 隐藏 Y 轴刻度标签
      },
      splitLine: {
        show: false,
      },
      max: function (value: { min: number; max: number }) {
        return value.max + 30;
      },
    },
    series: [
      {
        name: '体重',
        data: userWeekTrend?.weight.statics.map(item => item.value),
        type: 'bar',
        itemStyle: {
          color: '#4096ef',
          borderRadius: [4, 4, 4, 4],
        },
        label: {
          show: true,
          position: 'top',
          color: '#4096ef',
        },
      },
      {
        name: 'BMI',
        data: userWeekTrend?.bmi.statics.map(item => item.value),
        type: 'line',
        itemStyle: {
          color: '#8befac',
        },
        label: {
          show: true,
          position: 'top',
          color: '#8befac',
        },
      },
    ],
  };

  return <ReactECharts style={{ height: '10rem' }} option={options} />;
};

export default WeightTrendsChart;
