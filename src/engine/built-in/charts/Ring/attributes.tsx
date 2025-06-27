/**
 * 配置
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: RingOptions = {
  titleColor: "#000",
  subtextColor: "#bababa",
};

export type RingOptions = {
  titleColor?: string; // 标题颜色
  subtextColor?: string; // 副标题颜色
};

export default createAttributesByConfig<RingOptions>(
  [
    {
      key: "titleColor",
      label: "标题颜色",
      component: "colorPicker",
      options: {
        reset: true,
        presetColor: DEFAULT_OPTIONS?.titleColor,
      },
    },
    {
      key: "subtextColor",
      label: "副标题颜色",
      component: "colorPicker",
      options: {
        reset: true,
        presetColor: DEFAULT_OPTIONS?.subtextColor,
      },
    },
  ],
  DEFAULT_OPTIONS,
);
