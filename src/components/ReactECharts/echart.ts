/**
 * echart 按需加载
 *
 * @author tangjiahui
 * @date 2025/3/3
 */
import * as echarts from "echarts/core";
import { BarChart, PieChart, LineChart, RadarChart, GaugeChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

export type { EChartsOption, EChartsType } from "echarts";

// 注册必须的组件
echarts.use([
  // 图表
  PieChart,
  BarChart,
  LineChart,
  RadarChart,
  GaugeChart,
  // 组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  // 自动布局、全局动画
  LabelLayout,
  UniversalTransition,
  // Canvas 渲染器
  CanvasRenderer,
]);

export default echarts;
