/**
 * IInputNumber
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { InputNumber, InputNumberProps } from "antd";

export type IInputNumberProps = Omit<InputNumberProps, "onChange"> & {
  onChange?: (value?: number) => void;
};

export function IInputNumber(props: IInputNumberProps) {
  const { onChange, ...rest } = props;
  return (
    <InputNumber
      min={1}
      max={99999999}
      size={"small"}
      placeholder={"请输入"}
      {...rest}
      onChange={(e) => {
        onChange?.((e as any) ?? undefined);
      }}
    />
  );
}
