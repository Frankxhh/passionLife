'use client';
import ReactECharts from 'echarts-for-react';

const WeightTrendsChart: React.FC = () => {
  const options = {
    grid: { top: 4, right: 0, bottom: 24, left: 0 },
    xAxis: {
      type: 'category',
      data: ['今', '二', '三', '四', '五', '六', '日'],
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
        data: [120, 200, 150, 80, 70, 110, 130],
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
        data: [20, 23, 17, 19, 21, 20, 18],
        type: 'line',
        itemStyle: {
          color: '#ec744a',
        },
      },
    ],
  };

  return <ReactECharts style={{ height: '8rem' }} option={options} />;
};

export default WeightTrendsChart;
