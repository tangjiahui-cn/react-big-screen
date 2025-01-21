/**
 * charts （图表组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import ICON_PIE from "@/static/built-in/pie.png";
import Pie from "./Pie";

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
];
