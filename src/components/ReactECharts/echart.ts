/**
 * echart 按需加载
 *
 * @author tangjiahui
 * @date 2025/3/3
 */
import * as echarts from "echarts/core";
import {
  BarChart,
  PieChart,
  LineChart,
  RadarChart,
  GaugeChart,
  MapChart,
  EffectScatterChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  VisualMapComponent,
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
  MapChart,
  EffectScatterChart,
  // 组件
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  // 自动布局、全局动画
  LabelLayout,
  UniversalTransition,
  // Canvas 渲染器
  CanvasRenderer,
]);

// @ts-ignore
window.echarts = echarts;
export default echarts;
