import { ComponentType } from '@/engine';

export type GlobalComponentMap = Record<string, ComponentType>;

export interface GlobalConfig {
  width: number;
  height: number;
}

export interface GlobalState {
  componentMap: GlobalComponentMap;
  config: GlobalConfig;
}
