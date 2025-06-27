/**
 * 折线图属性面板
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: ScrollListOptions = {
  autoScroll: true,
  pxPerSecond: 12,
};

export interface ScrollListOptions {
  // 滚动配置
  pxPerSecond?: number; // 每秒滚动像素
  autoScroll?: boolean; // 开启自动滚动
}

export default createAttributesByConfig<ScrollListOptions>(
  [
    <b key={"data"}>滚动配置</b>,
    {
      key: "pxPerSecond",
      label: "每秒滚动像素",
      component: "inputNumber",
    },
    {
      key: "autoScroll",
      label: "自动滚动",
      component: "checkbox",
    },
  ],
  DEFAULT_OPTIONS,
);
