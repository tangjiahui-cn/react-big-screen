/**
 * IInput
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { Input, InputProps } from "antd";
import styles from "./IInput.module.less";
import classNames from "classnames";

export type IInputProps = Omit<InputProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export function IInput(props: IInputProps) {
  const { onChange, className, ...rest } = props;
  return (
    <Input
      allowClear
      maxLength={100}
      size={"small"}
      placeholder={"请输入"}
      className={classNames(className, styles.iinput)}
      {...rest}
      onChange={(e) => {
        onChange?.(e?.target?.value || "");
      }}
    />
  );
}
