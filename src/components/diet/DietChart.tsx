'use client';

import { RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { type DietRecordStatistics } from '@/actions/diet/type';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

interface DietChartProps {
  dietRecordChartRes?: DietRecordStatistics | null;
  dietRecordChartStatisticsPercent: Record<string, string>;
}

const DietChart = ({ dietRecordChartRes, dietRecordChartStatisticsPercent }: DietChartProps) => {
  const chartData = [
    { browser: '碳水', visitors: dietRecordChartRes?.carbs, fill: 'var(--color-chrome)' },
    { browser: '蛋白质', visitors: dietRecordChartRes?.protein, fill: 'var(--color-safari)' },
    { browser: '脂肪', visitors: dietRecordChartRes?.fat, fill: 'var(--color-firefox)' },
  ];
  return (
    <Card className="mb-4 flex flex-col">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>今日饮食记录</CardTitle>
        <CardDescription>2025-02-09</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
            <RadialBar dataKey="visitors" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Card className="w-full">
          <div className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-chart-1" />
                <span className="text-sm font-medium">碳水</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm">{dietRecordChartRes?.carbs}</span>
                <span className="w-12 text-right text-sm">{dietRecordChartStatisticsPercent.carbs}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-chart-2" />
                <span className="text-sm font-medium">蛋白质</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm">{dietRecordChartRes?.protein}</span>

                <span className="w-12 text-right text-sm">{dietRecordChartStatisticsPercent.protein}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-chart-3" />
                <span className="text-sm font-medium">脂肪</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm">{dietRecordChartRes?.fat}</span>

                <span className="w-12 text-right text-sm">{dietRecordChartStatisticsPercent.fat}</span>
              </div>
            </div>
          </div>
        </Card>
      </CardFooter>
    </Card>
  );
};
export default DietChart;
