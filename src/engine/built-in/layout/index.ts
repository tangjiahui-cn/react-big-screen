/**
 * layout （布局组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import Tabs from "./Tabs";
import ICON_TABS from "@/static/built-in/tabs.png";

export const layout: ComponentType[] = [
  {
    cId: "tabs",
    cName: "标签页",
    icon: ICON_TABS,
    group: "charts",
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
