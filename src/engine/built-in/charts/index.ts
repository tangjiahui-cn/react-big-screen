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
    options: {},
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
    options: {
      seriesList: [
        { key: "1", name: "数据1", value: "value1", color: "#f8e71c" },
        { key: "2", name: "数据2", value: "value2", color: "#7ed321" },
        { key: "3", name: "数据3", value: "value3", color: "#1071e0" },
      ],
    },
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
    options: {},
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
];
