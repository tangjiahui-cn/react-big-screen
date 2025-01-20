// 基础组件类型
import React from "react";

// 组件传入参数
export interface ComponentProps<Option = any> {
  width: number;
  height: number;
  options: Option; // 配置数据
}

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
}

// 组件模板类型
export interface ComponentType<Option = any> extends BaseComponent {
  icon: string; // 组件图标
  component: React.FC<ComponentProps<Option>>; // 组件模板
}

// 组件数据实例类型
export interface ComponentNodeType extends BaseComponent {
  id: string; // 实例id
  name: string; // 实例名称
  lock?: boolean; // 是否锁定（仅用于编辑模式）
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
}
