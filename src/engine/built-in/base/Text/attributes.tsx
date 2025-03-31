/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { createAttributes } from "@/engine";
import { Checkbox } from "antd";
import React from "react";
import {
  IColorPicker,
  FontWeightSelect,
  Line,
  ITextArea,
  IInputNumber,
  TextAlignSelect,
  TextAlignType,
  AttrContainer,
} from "@/components/Attributes";

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

export default createAttributes<TextOptions>((props) => {
  const { options, onChange } = props;
  return (
    <AttrContainer>
      <Line label={"内容"}>
        <ITextArea
          style={{ width: "100%" }}
          value={options?.value}
          onChange={(value) => {
            onChange({
              value,
            });
          }}
        />
      </Line>
      <Line label={"字号"}>
        <IInputNumber
          min={8}
          style={{ width: "100%" }}
          value={options?.fontSize}
          onChange={(fontSize) => {
            onChange({ fontSize });
          }}
        />
      </Line>
      <Line label={"行高"} labelTip={"单位px"}>
        <IInputNumber
          style={{ width: "100%" }}
          value={options?.lineHeight}
          onChange={(lineHeight) => {
            onChange({ lineHeight });
          }}
        />
      </Line>
      <Line label={"字重"}>
        <FontWeightSelect
          style={{ width: "100%" }}
          value={options?.fontWeight}
          onChange={(fontWeight?: any) => {
            onChange({ fontWeight });
          }}
        />
      </Line>
      <Line label={"颜色"}>
        <IColorPicker value={options?.color || "black"} onChange={(color) => onChange({ color })} />
      </Line>
      <Line label={"背景"}>
        <IColorPicker
          value={options?.background}
          onChange={(background) => onChange({ background })}
        />
      </Line>
      <Line label={"斜体"}>
        <Checkbox
          checked={options?.fontStyle === "italic"}
          onChange={(e) => {
            const isItalic = e.target.checked;
            onChange({
              fontStyle: isItalic ? "italic" : undefined,
            });
          }}
        />
      </Line>
      <Line label={"水平对齐"} labelSpan={5}>
        <TextAlignSelect
          style={{ width: "100%" }}
          value={options?.textAlign}
          onChange={(textAlign: any) => {
            onChange({
              textAlign,
            });
          }}
        />
      </Line>
    </AttrContainer>
  );
}, DEFAULT_OPTIONS);
