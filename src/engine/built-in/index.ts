/**
 * 内置组件
 *
 * @author tangjiahui
 * @date 2024/12/21
 */
import type { ComponentPackage, ComponentType } from "@/engine";
import { base } from "./base";
import { layout } from "./layout";
import { charts } from "./charts";

const builtInComponents: ComponentType[] = [
  ...base, // 基础组件
  ...layout, // 布局组件
  ...charts, // 图表组件
];

export const defaultPackage: ComponentPackage = {
  id: "system",
  name: "默认组件包",
  origin: "system",
  version: VERSION,
  components: builtInComponents,
  description: "由官方发布的组件库，随编辑器主版本迭代而更新。",
};
