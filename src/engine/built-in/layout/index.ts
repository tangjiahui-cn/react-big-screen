/**
 * layout （布局组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import Tabs from "./Tabs";

export const layout: ComponentType[] = [
  {
    cId: "tabs",
    cName: "标签页",
    icon: () => import("@/static/built-in/tabs.png"),
    group: "layout",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    options: {
      items: [
        { label: "Tab1", key: "1" },
        { label: "Tab2", key: "2" },
      ],
    },
    component: Tabs,
  },
];
