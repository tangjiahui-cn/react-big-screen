/**
 * charts （图表组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import ICON_PIE from "@/static/built-in/pie.png";
import ICON_LINE from "@/static/built-in/line.png";
import ICON_BAR from "@/static/built-in/bar.png";
import ICON_RADAR from "@/static/built-in/radar.png";
import ICON_GAUGE from "@/static/built-in/gauge.png";
import Pie from "./Pie";
import Line from "./Line";
import Bar from "./Bar";
import Radar from "./Radar";
import Gauge from "./Gauge";

export const charts: ComponentType[] = [
  {
    cId: "pie",
    cName: "饼形图",
    icon: ICON_PIE,
    group: "charts",
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
    icon: ICON_LINE,
    group: "charts",
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
    icon: ICON_BAR,
    group: "charts",
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
    icon: ICON_RADAR,
    group: "charts",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    options: {},
    component: Radar,
  },
  {
    cId: "gauge",
    cName: "仪表盘",
    icon: ICON_GAUGE,
    group: "charts",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    options: {},
    component: Gauge,
  },
];
