/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributes } from "@/engine";
import {
  AttrContainer,
  FontWeightSelect,
  IColorPicker,
  IInput,
  IInputNumber,
  Line,
  TextAlignSelect,
  TextAlignType,
} from "@/components/Attributes";
import React from "react";
import { Checkbox } from "antd";

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
}

export default createAttributes<TitleOptions>((props) => {
  const { options, onChange } = props;
  return (
    <AttrContainer>
      <Line label={"标题"}>
        <IInput
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
