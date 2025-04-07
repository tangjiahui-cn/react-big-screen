/**
 * RegisterDefault
 *
 * @author tangjiahui
 * @date 2025/3/31
 * @description 注册默认模板。
 */
import {
  FontWeightSelect,
  IColorPicker,
  IInput,
  IInputNumber,
  ITextArea,
  ResetButton,
  TextAlignSelect,
} from "@/components/Attributes";
import ConfigRender from ".";
import { Checkbox } from "antd";
import ICustomSelect from "@/components/ICustomSelect";
import { IOption } from "@/components/ICustomSelect/type";

export type DEFAULT_REGISTER_KEY =
  | "input" // 文本输入框
  | "inputNumber" // 数字输入框
  | "textarea" // 文本区域
  | "fontWeightSelect" // 字重下拉框
  | "colorPicker" // 颜色选择器
  | "checkbox" // 勾选框
  | "checkboxValue" // 勾选框（指定真值）
  | "textAlignSelect" // 文字对齐下拉框
  | "antdButtonTypeSelect"; // antd按钮类型下拉框

export default function registerDefault() {
  // 输入框
  ConfigRender.register("input", (props) => {
    return <IInput {...props?.options} value={props.value} onChange={props.onChange} />;
  });

  // 数字输入框
  ConfigRender.register("inputNumber", (props) => {
    return (
      <IInputNumber
        style={{ width: "100%" }}
        {...props?.options}
        value={props.value}
        onChange={props.onChange}
      />
    );
  });

  // 文本区域
  ConfigRender.register("textarea", (props) => {
    return <ITextArea {...props?.options} value={props.value} onChange={props.onChange} />;
  });

  // 字重下拉框
  ConfigRender.register("fontWeightSelect", (props) => {
    return (
      <FontWeightSelect
        style={{ width: "100%" }}
        value={props.value}
        onChange={props.onChange}
        {...props?.options}
      />
    );
  });

  // 颜色选择框
  ConfigRender.register("colorPicker", (props) => {
    const {
      reset, // 是否支持重置
      resetColor, // 重置颜色
    } = props?.options || {};
    const children = (
      <IColorPicker
        style={{ width: "100%" }}
        {...props?.options}
        value={props.value}
        onChange={props.onChange}
      />
    );
    if (reset) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {children}
          <ResetButton
            onClick={() => {
              props.onChange(resetColor);
            }}
          />
        </div>
      );
    }
    return children;
  });

  // 多选框
  ConfigRender.register("checkbox", (props) => {
    return (
      <Checkbox
        {...props?.options}
        checked={props.value}
        onChange={(e) => props.onChange?.(e.target.checked)}
      />
    );
  });

  // 多选框（值为手动指定的value）
  ConfigRender.register("checkboxValue", (props) => {
    const { value = "", empty = undefined } = props?.options || {};
    return (
      <Checkbox
        {...props?.options}
        checked={props.value === value}
        onChange={(e) => {
          props.onChange?.(e.target.checked ? value : empty);
        }}
      />
    );
  });

  // 文本对齐下拉框
  ConfigRender.register("textAlignSelect", (props) => {
    return (
      <TextAlignSelect
        style={{ width: "100%" }}
        {...props?.options}
        value={props.value}
        onChange={props?.onChange}
      />
    );
  });

  // antd 按钮类型下拉框
  const BTN_TYPE_OPTIONS: IOption[] = [
    { label: "主按钮", value: "primary" },
    { label: "默认", value: "default" },
    { label: "虚线", value: "dashed" },
    { label: "幽灵", value: "ghost" },
    { label: "文字", value: "text" },
    { label: "链接", value: "link" },
  ];
  ConfigRender.register("antdButtonTypeSelect", (props) => {
    return (
      <ICustomSelect
        style={{ width: "100%" }}
        requestFn={async () => BTN_TYPE_OPTIONS}
        {...props?.options}
        value={props.value}
        onChange={props?.onChange}
      />
    );
  });
}
