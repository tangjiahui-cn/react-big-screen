// 基础组件类型
import React from "react";

// 组件传入参数
export interface ComponentProps<Option extends any> {
  width: number;
  height: number;
  options: Option; // 配置数据
  componentNode: ComponentNodeType; // 对应的componentNode
  dataSource?: any; // 接口返回结果
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
}

// 组件数据实例类型 (会被保存)
export interface ComponentNodeType extends BaseComponent {
  id: string; // 实例id
  name: string; // 实例名称
  lock?: boolean; // 是否锁定（仅用于编辑模式）
  groupId?: string; // 所属成组的id
  show?: boolean; // 控制组件是否显示
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
  request?: (params?: Record<string, any>) => void; // 立刻请求一次
}

// 组件分组
export interface ComponentNodeGroup {
  children: Set<string>; // 存储包含的组件id
}
