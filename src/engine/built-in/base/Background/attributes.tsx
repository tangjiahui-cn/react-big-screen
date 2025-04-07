/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS = {
  background: "#223447",
};

export interface BackgroundOptions {
  background: string; // 背景颜色
}

export default createAttributesByConfig<BackgroundOptions>(
  [
    {
      key: "background",
      label: "背景",
      component: "colorPicker",
    },
  ],
  DEFAULT_OPTIONS,
);
