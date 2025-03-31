/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributes } from "@/engine";
import { AttrContainer, IInput, IInputNumber, Line } from "@/components/Attributes";
import { ButtonProps } from "antd";
import ICustomSelect from "@/components/ICustomSelect";
import { IOption } from "@/components/ICustomSelect/type";

const BTN_TYPE_OPTIONS: IOption[] = [
  { label: "主按钮", value: "primary" },
  { label: "默认", value: "default" },
  { label: "虚线", value: "dashed" },
  { label: "幽灵", value: "ghost" },
  { label: "文字", value: "text" },
  { label: "链接", value: "link" },
];

export const DEFAULT_OPTIONS = {
  value: "标题",
  borderRadius: 2,
};

export interface ButtonOptions {
  type: ButtonProps["type"];
  value: string; // 标题内容
  borderRadius: number; // 外边框圆角
}

export default createAttributes<ButtonOptions>((props) => {
  const { options, onChange } = props;
  return (
    <AttrContainer>
      <Line label={"内容"}>
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
      <Line label={"类型"}>
        <ICustomSelect
          style={{ width: "100%" }}
          value={options?.type}
          requestFn={async () => BTN_TYPE_OPTIONS}
          onChange={(type: any) => {
            onChange({
              type,
            });
          }}
        />
      </Line>
      <Line label={"边框圆角"} labelSpan={5}>
        <IInputNumber
          style={{ width: "100%" }}
          value={options?.borderRadius}
          onChange={(borderRadius) => {
            onChange({
              borderRadius,
            });
          }}
        />
      </Line>
    </AttrContainer>
  );
}, DEFAULT_OPTIONS);
