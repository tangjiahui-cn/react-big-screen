/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributesByConfig } from "@/engine";
import type { TextAlignType } from "@/components/Attributes";
import React from "react";

export const DEFAULT_OPTIONS = {
  value: "标题",
  color: "black",
  fontSize: 18,
};

export interface TitleOptions {
  value: string; // 标题内容
  fontWeight?: string; // 字重
  color?: string; // 字体颜色
  fontStyle?: React.CSSProperties["fontStyle"]; // 字体样式
  fontSize?: number; // 字号
  textAlign?: TextAlignType; // 水平对齐（默认不设置）
  background?: string; // 背景颜色
  letterSpacing?: number; // 文字间距
}

export default createAttributesByConfig<TitleOptions>(
  [
    { key: "value", label: "标题", component: "input" },
    { key: "fontSize", label: "字号", component: "inputNumber" },
    { key: "fontWeight", label: "字重", component: "fontWeightSelect" },
    { key: "letterSpacing", label: "字距", component: "inputNumber" },
    { key: "color", label: "颜色", component: "colorPicker" },
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
