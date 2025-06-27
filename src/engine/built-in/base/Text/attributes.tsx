/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { createAttributesByConfig } from "@/engine";
import React from "react";
import { TextAlignType } from "@/components/Attributes";

export const DEFAULT_OPTIONS: TextOptions = {
  color: "black",
  value: "一段文字",
  fontSize: 14,
  lineHeight: 32,
};

export interface TextOptions {
  value?: string; // 文字内容
  fontWeight?: string; // 字重
  color?: string; // 字体颜色
  fontStyle?: React.CSSProperties["fontStyle"]; // 字体样式
  lineHeight?: number; // 行高（px）
  fontSize?: number; // 字号
  textAlign?: TextAlignType; // 水平对齐（默认不设置）
  background?: string; // 背景颜色
}

export default createAttributesByConfig<TextOptions>(
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
    { key: "background", label: "背景", component: "colorPicker" },
    {
      key: "fontStyle",
      label: "斜体",
      component: "checkboxValue",
      options: {
        value: "italic",
      },
    },
    { key: "textAlign", label: "水平对齐", component: "textAlignSelect" },
  ],
  DEFAULT_OPTIONS,
);
