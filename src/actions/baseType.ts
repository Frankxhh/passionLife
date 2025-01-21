// 图表数据公共响应
export interface ChartData {
  maxValue: number;
  minValue: number;
  statics: Statics[];
}

// 图表数据统计
export interface Statics {
  date: Date;
  value: number | null;
  viewName: string;
}
