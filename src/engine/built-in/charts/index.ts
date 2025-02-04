/**
 * charts （图表组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import Pie from "./Pie";
import Line from "./Line";
import Bar from "./Bar";
import Radar from "./Radar";
import Gauge from "./Gauge";

export const charts: ComponentType[] = [
  {
    cId: "pie",
    cName: "饼形图",
    icon: () => import("@/static/built-in/pie.png"),
    category: "charts",
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    options: {},
    component: Pie,
  },
  {
    cId: "line",
    cName: "折线图",
    icon: () => import("@/static/built-in/line.png"),
    category: "charts",
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    options: {},
    component: Line,
  },
  {
    cId: "bar",
    cName: "柱形图",
    icon: () => import("@/static/built-in/bar.png"),
    category: "charts",
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    options: {},
    component: Bar,
  },
  {
    cId: "radar",
    cName: "雷达图",
    icon: () => import("@/static/built-in/radar.png"),
    category: "charts",
    x: 0,
    y: 0,
    width: 350,
    height: 300,
    options: {},
    component: Radar,
  },
  {
    cId: "gauge",
    cName: "仪表盘",
    icon: () => import("@/static/built-in/gauge.png"),
    category: "charts",
    x: 0,
    y: 0,
    width: 350,
    height: 300,
    options: {},
    component: Gauge,
  },
];
