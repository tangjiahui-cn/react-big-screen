/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { AttributesComponentProps } from "@/engine";
import { Checkbox } from "antd";
import React from "react";
import {
  IColorPicker,
  FontWeightSelect,
  Line,
  ITextArea,
  IInputNumber,
} from "@/components/Attributes";

export interface TextOptions {
  value?: string; // 文字内容
  fontWeight?: string; // 字重
  color?: string; // 字体颜色
  fontStyle?: React.CSSProperties["fontStyle"];
  lineHeight?: number; // 行高（px）
  fontSize?: number; // 字号
}

export default function (props: AttributesComponentProps<TextOptions>) {
  const { options, onChange } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
    </div>
  );
}
