/**
 * 内置组件
 *
 * @author tangjiahui
 * @date 2024/12/21
 */
import type { ComponentType } from "@/engine";
import { base } from "./base";
import { layout } from "./layout";
import { charts } from "./charts";

export const builtInComponents: ComponentType[] = [
  ...base, // 基础组件
  ...layout, // 布局组件
  ...charts, // 图表组件
];
