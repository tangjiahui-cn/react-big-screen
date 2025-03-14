/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { createAttributes } from "@/engine";
import { IColorPicker, IInputNumber, Line, ResetButton } from "@/components/Attributes";
import { IInput } from "@/components/Attributes/base/IInput";
import { Checkbox, Space } from "antd";

export interface SpecialCardOptions {
  title?: string; // 标题内容

  // 边框
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  borderWidth?: number; // 边框宽度（像素）
  borderRadius?: number; // 边框圆角

  // 背景
  background?: string; // 背景颜色

  // 文字
  color?: string; // 文字颜色
}

export default createAttributes<SpecialCardOptions>((props) => {
  const { options, onChange } = props;
  return (
    <Space style={{ width: "100%" }} direction={"vertical"}>
      <Line label={"标题"}>
        <IInput
          value={options?.title}
          onChange={(title) => {
            onChange({ title });
          }}
        />
      </Line>
      <Line label={"边框"}>
        <Checkbox
          checked={options?.bordered}
          onChange={(e) => onChange({ bordered: e.target.checked })}
        />
      </Line>

      {options?.bordered && (
        <>
          <Line label={"边框宽度"} labelSpan={5}>
            <IInputNumber
              style={{ width: "100%" }}
              value={options?.borderWidth || 1}
              onChange={(borderWidth) => onChange({ borderWidth })}
            />
          </Line>
          <Line label={"边框颜色"} labelSpan={5}>
            <IColorPicker
              style={{ width: "100%" }}
              value={options?.borderColor}
              onChange={(borderColor) => onChange({ borderColor })}
            />
          </Line>
        </>
      )}

      <Line label={"边框圆角"} labelSpan={5}>
        <IInputNumber
          style={{ width: "100%" }}
          value={options?.borderRadius}
          onChange={(borderRadius) => onChange({ borderRadius })}
        />
      </Line>

      <Line label={"背景"} labelSpan={5}>
        <IColorPicker
          value={options?.background}
          onChange={(background) => onChange({ background })}
        />
      </Line>
      <Line
        label={"文字颜色"}
        labelSpan={5}
        childrenStyle={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <IColorPicker
          style={{ flex: 1 }}
          value={options?.color}
          onChange={(color) => onChange({ color })}
        />
        <ResetButton
          onClick={() => {
            onChange({ color: undefined });
          }}
        />
      </Line>
    </Space>
  );
});
