/**
 * IInput
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { Input, InputProps } from "antd";

export function IInput(
  props: Omit<InputProps, "onChange"> & {
    onChange?: (value: string) => void;
  },
) {
  const { onChange, ...rest } = props;
  return (
    <Input
      allowClear
      maxLength={100}
      size={"small"}
      placeholder={"请输入"}
      {...rest}
      onChange={(e) => {
        onChange?.(e?.target?.value || "");
      }}
    />
  );
}
