import { createAttributesByConfig } from "@/engine";
import React from "react";

export const DEFAULT_OPTIONS: DateDisplayOptions = {
  color: "black",
  fontSize: 16,
  lineHeight: 22,
};

export type DateDisplayOptions = {
  color?: string; // 文字颜色
  fontSize?: number; // 字号
  lineHeight?: number; // 行高
  textAlign?: React.CSSProperties["textAlign"]; // 文字布局
};

export default createAttributesByConfig<DateDisplayOptions>(
  [
    {
      key: "color",
      label: "字色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
    {
      key: "fontSize",
      label: "字号",
      component: "inputNumber",
    },
    {
      key: "lineHeight",
      label: "行高",
      labelTip: "单位：px",
      component: "inputNumber",
    },
    {
      key: "textAlign",
      label: "布局",
      component: "textAlignSelect",
    },
  ],
  DEFAULT_OPTIONS,
);
