/**
 * charts （图表组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import React from "react";

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
    component: React.lazy(() => import("./Pie")),
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
    component: React.lazy(() => import("./Line")),
    attributesComponent: React.lazy(() => import("./Line/attributes")),
    dataSourceType: "static",
    staticDataSource: [
      { name: "选项一", value1: 100, value2: 200, value3: 300 },
      { name: "选项二", value1: 50, value2: 150, value3: 250 },
      { name: "选项三", value1: 80, value2: 180, value3: 280 },
    ],
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
    component: React.lazy(() => import("./Bar")),
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
    component: React.lazy(() => import("./Radar")),
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
    component: React.lazy(() => import("./Gauge")),
  },
  {
    cId: "horizontalBar",
    cName: "横向柱形图",
    icon: () => import("@/static/built-in/horizontalBar.png"),
    category: "charts",
    x: 0,
    y: 0,
    width: 350,
    height: 300,
    options: {},
    component: React.lazy(() => import("./HorizontalBar")),
  },
  {
    cId: "barLine",
    cName: "柱形折线图",
    category: "charts",
    icon: () => import("@/static/built-in/barLine.png"),
    x: 0,
    y: 0,
    width: 350,
    height: 300,
    options: {},
    component: React.lazy(() => import("./BarLine")),
  },
  {
    cId: "ring",
    cName: "圆环图",
    category: "charts",
    icon: () => import("@/static/built-in/ring.png"),
    x: 0,
    y: 0,
    width: 350,
    height: 300,
    options: {},
    component: React.lazy(() => import("./Ring")),
    attributesComponent: React.lazy(() => import("./Ring/attributes")),
  },
];
