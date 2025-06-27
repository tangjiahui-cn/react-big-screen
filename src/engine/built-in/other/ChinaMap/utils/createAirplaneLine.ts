/**
 * 创建飞机航线
 *
 * @author tangjiahui
 * @date 2025/6/26
 */
import { lines, planePath, pointers } from "@/engine/built-in/other/ChinaMap/data/mockData";
import { type EChartsOption } from "@/components/ReactECharts";

const color = "#00ffe4";
const curveness = 0.2; // 曲度 0~1 曲度越来越大
const period = 5; // 动画时长。图标飞跃速度，值越小速度越快

export function createAirplaneLine(): EChartsOption["series"] {
  return [
    // 飞机轨迹
    {
      type: "lines",
      zlevel: 3,
      coordinateSystem: "geo",
      effect: {
        show: true,
        period,
        trailLength: 0.7, // 尾迹长度[0,1]值越大，尾迹越长
        symbolSize: 3, // 图标大小
        color,
      },
      lineStyle: {
        width: 0,
        curveness, // 图线曲度
      },
      data: lines,
    },
    // 飞机
    {
      type: "lines",
      zlevel: 2,
      symbol: ["none", "arrow"], //线两端的标记类型，可以是一个数组分别指定两端
      symbolSize: 10,
      effect: {
        show: true,
        period,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15,
        color,
      },
      lineStyle: {
        color,
        curveness,
        width: 1,
        opacity: 0.2, // 轨迹线
      },
      data: lines,
    },
    {
      // 涟漪效果
      zlevel: 1,
      type: "effectScatter",
      coordinateSystem: "geo",
      data: pointers,
      symbolSize: 10,
      encode: {
        value: 2,
      },
      rippleEffect: {
        brushType: "stroke",
        number: 2,
        color,
      },
      emphasis: {
        scale: false, // 高亮后禁止放大
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: color,
        color,
      },
    },
  ];
}
