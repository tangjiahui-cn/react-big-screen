/**
 * RegisterDefault
 *
 * @author tangjiahui
 * @date 2025/3/31
 * @description 注册默认模板。
 */
import select from "./select";
import input from "./input";
import inputNumber from "./inputNumber";
import textarea from "./textarea";
import fontWeightSelect from "./fontWeightSelect";
import colorPicker from "./colorPicker";
import checkbox from "./checkbox";
import checkboxValue from "./checkboxValue";
import textAlignSelect from "./textAlignSelect";
import antdButtonTypeSelect from "./antdButtonTypeSelect";
import slider from "./slider";

export type DEFAULT_REGISTER_KEY =
  | "select" // 下拉框
  | "input" // 文本输入框
  | "inputNumber" // 数字输入框
  | "textarea" // 文本区域
  | "fontWeightSelect" // 字重下拉框
  | "colorPicker" // 颜色选择器
  | "checkbox" // 勾选框
  | "checkboxValue" // 勾选框（指定真值）
  | "textAlignSelect" // 文字对齐下拉框
  | "antdButtonTypeSelect" // antd按钮类型下拉框
  | "slider"; // 滑动条

export default function registerDefault() {
  // 下拉框
  select();
  // 输入框
  input();
  // 数字输入框
  inputNumber();
  // 文本区域
  textarea();
  // 字重下拉框
  fontWeightSelect();
  // 颜色选择框
  colorPicker();
  // 勾选框
  checkbox();
  // 勾选框（值为手动指定的value）
  checkboxValue();
  // 文本对齐下拉框
  textAlignSelect();
  // antd 按钮类型下拉框
  antdButtonTypeSelect();
  // 滑动条
  slider();
}
