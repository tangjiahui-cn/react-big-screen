// 基础组件类型
import React from "react";

// 组件传入参数
export type ComponentHandleTrigger<TriggerKeys extends string = string> = (
  triggerId: TriggerKeys,
  payload?: any,
) => void;

export type ComponentUseExpose<ExposeKeys extends string = string> = (
  exposes: Record<ExposeKeys, (payload: any) => void>,
) => void;

export interface ComponentProps<
  Option extends any,
  TriggerKeys extends string = string,
  ExposeKeys extends string = string,
> {
  width: number;
  height: number;
  options: Option; // 配置数据
  componentNode: ComponentNodeType; // 对应的componentNode
  dataSource?: any; // 接口返回结果

  // 交互相关
  handleTrigger: ComponentHandleTrigger<TriggerKeys>; // 触发事件
  useExpose: ComponentUseExpose<ExposeKeys>; // 暴露事件（hooks）
}

// 组件属性配置模板参数
export interface AttributesComponentProps<Option = any> {
  componentNode: ComponentNodeType;
  onChangeComponentNode: (
    componentNode:
      | Partial<ComponentNodeType>
      | ((origin: ComponentNodeType) => Partial<ComponentNodeType>),
  ) => void;
  options: Option; // 配置数据
  onChange: (options: Option, cover?: boolean) => void; // 配置数据修改回调 （cover：默认false。true覆盖，false则修改部分属性）
}

export interface PanelData {
  label: string; // (父) 包含的panel名称
  value: string; // (父) 包含的panel的id
}
export type ComponentCategory = "base" | "charts" | "layout" | "unknown"; // 组件分类
export type ComponentRequestMethod = "get" | "post" | "put" | "delete"; // 组件请求类型
export type ComponentRequest = {
  // 组件请求配置对象
  url?: string; // 请求地址
  method?: ComponentRequestMethod; // 请求类型
  loop?: boolean; // 是否轮训
  loopDelay?: number; // 轮训间隔
  first?: boolean; // 是否初次请求
};

// 基础组件类型（组件模板、组件数据实例公共的属性）
export interface BaseComponent {
  cId: string; // 组件id
  cName: string; // 组件名称
  x: number; // 坐标 x
  y: number; // 坐标 y
  width: number; // 宽度
  height: number; // 高度
  level?: number; // 层级
  options?: Record<string, any>; // 配置数据
  category: ComponentCategory; // 组件分类

  // layout相关
  panelId?: PanelData["value"]; // (子) 所属panelId
  currentPanelId?: PanelData["value"]; // (父) 当前展示panel
  panels?: PanelData[];

  // 请求相关
  request?: ComponentRequest;
}

// 组件模板类型
export interface ComponentType<Option = any> extends BaseComponent {
  icon: string | (() => Promise<typeof import("*.png")>); // 组件图标
  component: React.FC<ComponentProps<Option>>; // 组件模板
  attributesComponent?: React.FC<AttributesComponentProps<Option>>; // 属性配置页面模板
  exposes?: EventData[]; // 注册内部暴露事件（通过外部可以触发内部暴露事件）
  triggers?: EventData[]; // 注册内部触发事件（外部主动触发事件）
}

export interface EventData<VALUE extends string = string> {
  label: string; // 事件名称
  value: VALUE; // 事件id
}
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

export interface ComponentNodeEventTargetOpt {
  // 目标组件操作
  operateId: string; // 操作id
  exposeId: "visible" | "request" | "custom" | string; // 目标expose事件Id
  option: ComponentNodeEventTargetOption;
}

export interface ComponentNodeEventTarget {
  id: string; // 目标组件id
  opts: ComponentNodeEventTargetOpt[];
}

export interface ComponentNodeEvent {
  triggerId?: string; // 触发id
  targets?: ComponentNodeEventTarget[]; // 触发目标
}

// 组件数据实例类型 (会被保存)
export interface ComponentNodeType extends BaseComponent {
  id: string; // 实例id
  name: string; // 实例名称
  lock?: boolean; // 是否锁定（仅用于编辑模式）
  groupId?: string; // 所属成组的id
  show?: boolean; // 控制组件是否显示

  // 交互事件
  events?: ComponentNodeEvent[];
}

// 全局配置类型
export interface GlobalConfig {
  width: number;
  height: number;
}

export type ComponentUsed = Record<
  string, // cId
  {
    count: number; // 使用数量
  }
>;

// json 文件格式
export interface JsonType {
  // 实例化组件列表
  componentNodes: ComponentNodeType[];
  // 全局配置
  config: GlobalConfig;
  // 已使用组件列表统计
  used: ComponentUsed;
  // 选中组件id列表
  selectedIds?: string[];
}

// 数据行为实例类型
export interface InstanceType {
  id: string; // 实例id
  handleHover: () => void; // 经过实例
  handleUnHover: () => void; // 取消经过实例
  handleSelected: () => void; // 选中实例
  handleUnSelected: () => void; // 取消选中实例
  getContainerDom: () => HTMLDivElement; // 获取容器dom
  getComponentNode: () => ComponentNodeType; // 获取实例对应的 componentNode
  getComponent: () => ComponentType; // 获取实例的 component
  reloadRequest: () => void; // 重新载入request
  /**
   * 立刻请求一次
   * @param params 查询参数
   * @param noCache 是否不启用缓存（默认false走缓存）
   */
  request?: (params?: Record<string, any>, noCache?: boolean) => Promise<any>;
}

// 组件分组
export interface ComponentNodeGroup {
  children: Set<string>; // 存储包含的组件id
}
