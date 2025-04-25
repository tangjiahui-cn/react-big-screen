/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: InputOptions = {
  placeholder: "请输入",
  allowClear: true,
};

export interface InputOptions {
  value?: string; // 文字内容
  placeholder?: string; // 占位符
  maxLength?: number; // 最大可输入长度
  allowClear?: boolean; // 是否可清空
}

export default createAttributesByConfig<InputOptions>(
  [
    { key: "value", label: "内容", component: "input" },
    { key: "placeholder", label: "占位符", component: "input" },
    { key: "maxLength", label: "最大长度", component: "inputNumber" },
    { key: "allowClear", label: "可清空", component: "checkbox" },
  ],
  DEFAULT_OPTIONS,
);
