/**
 * 内置组件
 *
 * @author tangjiahui
 * @date 2024/12/21
 */
import type { ComponentPackage } from "@/engine";
import { base } from "./base";
import { layout } from "./layout";
import { charts } from "./charts";
import { nav } from "./nav";

export const defaultPackage: ComponentPackage = {
  id: "system",
  name: "默认组件包",
  origin: "system",
  version: VERSION,
  description: "由官方发布的组件库，随编辑器主版本迭代而更新。",
  components: [
    ...base, // 基础组件
    ...layout, // 布局组件
    ...charts, // 图表组件
    ...nav, // 导航组件
  ],
};
