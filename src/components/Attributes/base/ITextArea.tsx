/**
 * ITextArea
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";

export function ITextArea(
  props: Omit<TextAreaProps, "onChange"> & {
    onChange?: (text: string) => void;
  },
) {
  const { onChange, ...rest } = props;
  return (
    <Input.TextArea
      allowClear
      maxLength={500}
      placeholder={"请输入"}
      autoSize={{ minRows: 3, maxRows: 3 }}
      size={"small"}
      {...rest}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
