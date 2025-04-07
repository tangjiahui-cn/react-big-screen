/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributesByConfig } from "@/engine";
import { ButtonProps } from "antd";

export const DEFAULT_OPTIONS = {
  value: "标题",
  borderRadius: 2,
};

export interface ButtonOptions {
  type: ButtonProps["type"];
  value: string; // 标题内容
  borderRadius: number; // 外边框圆角
}

export default createAttributesByConfig<ButtonOptions>(
  [
    {
      key: "value",
      label: "内容",
      component: "input",
    },
    {
      key: "type",
      label: "类型",
      component: "antdButtonTypeSelect",
    },
    {
      key: "borderRadius",
      label: "边框圆角",
      component: "inputNumber",
    },
  ],
  DEFAULT_OPTIONS,
);
