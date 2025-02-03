/**
 * 全局store
 *
 * @author tangjiahui
 * @date 2025/1/10
 * @description 存储的数据会导致引用位置全局更新，故避免存储需要经常变动的数据。
 */
import { create } from "zustand";
import { GlobalConfig, ComponentType, ComponentNodeType, GlobalRuntime } from "..";

export type ComponentMap = Record<string, ComponentType>;

export interface GlobalState {
  componentNodes: ComponentNodeType[]; // componentNodes
  componentMap: ComponentMap; // 组件模板映射 (cId => component)
  config: GlobalConfig; // 全局配置
  runtime: GlobalRuntime; // 全局运行时配置
}

export const useGlobalSelector = create<GlobalState>(() => ({
  componentNodes: [],
  componentMap: {},
  config: {
    width: 1920,
    height: 1080,
  },
  runtime: {},
}));

export function setGlobalState(
  state: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>),
) {
  useGlobalSelector.setState(state);
}

export function getGlobalState() {
  return useGlobalSelector.getState();
}
