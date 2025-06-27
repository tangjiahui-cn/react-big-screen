/**
 * 双行文本
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { createAttributesByConfig } from "@/engine";
import React from "react";
import { TextAlignType } from "@/components/Attributes";

export const DEFAULT_OPTIONS: TextOptions = {
  color_1: "black",
  value_1: "一段文字",
  fontSize_1: 14,
  lineHeight_1: 32,

  color_2: "black",
  value_2: "一段文字",
  fontSize_2: 14,
  lineHeight_2: 32,
};

export interface TextOptions {
  // 第一行
  value_1?: string; // 文字内容
  fontWeight_1?: string; // 字重
  color_1?: string; // 字体颜色
  fontStyle_1?: React.CSSProperties["fontStyle"]; // 字体样式
  lineHeight_1?: number; // 行高（px）
  fontSize_1?: number; // 字号
  textAlign_1?: TextAlignType; // 水平对齐（默认不设置）
  background_1?: string; // 背景颜色
  // 第二行
  value_2?: string; // 文字内容
  fontWeight_2?: string; // 字重
  color_2?: string; // 字体颜色
  fontStyle_2?: React.CSSProperties["fontStyle"]; // 字体样式
  lineHeight_2?: number; // 行高（px）
  fontSize_2?: number; // 字号
  textAlign_2?: TextAlignType; // 水平对齐（默认不设置）
  background_2?: string; // 背景颜色
}

function createConfig(suffix: string) {
  return [
    { key: "value" + suffix, label: "内容", component: "input" },
    { key: "fontSize" + suffix, label: "字号", component: "inputNumber", options: { min: 8 } },
    {
      key: "lineHeight" + suffix,
      label: "行高",
      labelTip: "单位px",
      component: "inputNumber",
      options: { min: 8 },
    },
    { key: "fontWeight" + suffix, label: "字重", component: "fontWeightSelect" },
    {
      key: "color" + suffix,
      label: "颜色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
    { key: "background" + suffix, label: "背景", component: "colorPicker" },
    {
      key: "fontStyle" + suffix,
      label: "斜体",
      component: "checkboxValue",
      options: {
        value: "italic",
      },
    },
    { key: "textAlign" + suffix, label: "水平对齐", component: "textAlignSelect" },
  ];
}

export default createAttributesByConfig<TextOptions>(
  [
    <b key={"line-1"} style={{ marginTop: 12 }}>
      第一行配置
    </b>,
    ...createConfig("_1"),
    <b key={"line-1"} style={{ marginTop: 12 }}>
      第二行配置
    </b>,
    ...createConfig("_2"),
  ],
  DEFAULT_OPTIONS,
);
