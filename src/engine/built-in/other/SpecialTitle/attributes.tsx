/**
 * 特殊标题 - 配置
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: SpecialTitleOptions = {
  color: "#2EDCF7",
  value: "一段文字",
  fontSize: 20,
  lineHeight: 32,
};

export type SpecialTitleOptions = {
  value?: string; // 内容
  color?: string; // 颜色
  lineHeight?: number; // 行高
  fontSize?: number; // 字号
  fontWeight?: string; // 字重
};

export default createAttributesByConfig(
  [
    { key: "value", label: "内容", component: "textarea" },
    { key: "fontSize", label: "字号", component: "inputNumber", options: { min: 8 } },
    {
      key: "lineHeight",
      label: "行高",
      labelTip: "单位px",
      component: "inputNumber",
      options: { min: 8 },
    },
    { key: "fontWeight", label: "字重", component: "fontWeightSelect" },
    {
      key: "color",
      label: "颜色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
  ],
  DEFAULT_OPTIONS,
);
