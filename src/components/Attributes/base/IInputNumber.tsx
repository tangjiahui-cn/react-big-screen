/**
 * IInputNumber
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { InputNumber, InputNumberProps } from "antd";

export function IInputNumber(
  props: Omit<InputNumberProps, "onChange"> & {
    onChange?: (value?: number) => void;
  },
) {
  const { onChange, ...rest } = props;
  return (
    <InputNumber
      min={1}
      max={999}
      size={"small"}
      placeholder={"请输入"}
      {...rest}
      onChange={(e) => {
        onChange?.((e as any) ?? undefined);
      }}
    />
  );
}
