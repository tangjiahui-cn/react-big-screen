import { create } from 'zustand';
import type { GlobalConfig, ComponentType, ComponentNodeType } from '..';

export type ComponentMap = Record<string, ComponentType>;

export interface GlobalState {
  componentNodes: ComponentNodeType[];
  componentMap: ComponentMap;
  config: GlobalConfig;
}

export const useGlobalSelector = create<GlobalState>(() => ({
  componentNodes: [],
  componentMap: {},
  config: {
    width: 1920,
    height: 1080,
  },
}));

export function setGlobalState(
  state: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>),
) {
  useGlobalSelector.setState(state);
}

export function getGlobalState() {
  return useGlobalSelector.getState();
}
