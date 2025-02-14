/**
 * 事件相关枚举和类型
 *
 * @author tangjiahui
 * @date 2025/2/14
 */
export interface ComponentNodeEventTargetVisibleOption {
  visible?: boolean;
}
export interface ComponentNodeEventTargetRequestOption {
  type: "default" | "json"; // 参数类型（默认、json对象）
  params?: Record<string, any>; // 自定义参数
  parserFunc?: string; // 转换函数
}
export interface ComponentNodeEventTargetCustomOption {
  function?: string; // 自定义函数内容
}
export interface ComponentNodeEventTargetCommonOption {
  type?: "default" | "number" | "text" | "json"; // 值类型 （默认、数字、文本值、json对象）
  value?: any; // 自定义值
  parserFunc?: string; // 转换函数
}

export type ComponentNodeEventTargetOption =
  | ComponentNodeEventTargetVisibleOption
  | ComponentNodeEventTargetRequestOption
  | ComponentNodeEventTargetCustomOption
  | ComponentNodeEventTargetCommonOption;

export type ComponentNodeEventTargetOptExposeId =
  | "$_visible" // 显隐
  | "$_request" // 接口请求
  | "$_custom" // 自定义函数
  | string;

export interface ComponentNodeEventTargetOpt {
  // 目标组件操作
  operateId: string; // 操作id
  exposeId: ComponentNodeEventTargetOptExposeId; // 目标expose事件Id
  option: ComponentNodeEventTargetOption;
}

export const INIT_EXPOSES = {
  visible: "$_visible",
  request: "$_request",
  custom: "$_custom",
};

export const INIT_EXPOSE_LIST: {
  label: string;
  value: ComponentNodeEventTargetOptExposeId;
}[] = [
  { label: "显隐", value: INIT_EXPOSES.visible },
  { label: "请求", value: INIT_EXPOSES.request },
  { label: "自定义函数", value: INIT_EXPOSES.custom },
];

export const INIT_EXPOSE_MAP: Record<ComponentNodeEventTargetOptExposeId, string> =
  INIT_EXPOSE_LIST.reduce((dataMap, current) => {
    dataMap[current.value] = current.label;
    return dataMap;
  }, {} as Record<ComponentNodeEventTargetOptExposeId, string>);
