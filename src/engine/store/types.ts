import { ComponentType } from '@/engine';
import { PanelType } from '@/engine/type';

export type GlobalComponentMap = Record<string, ComponentType>;

export interface GlobalConfig {
  width: number;
  height: number;
}

export interface GlobalState {
  // registered components map.
  componentMap: GlobalComponentMap;
  // config.
  config: GlobalConfig;
  // panels.
  panels: PanelType[];
  // runtime variables.
  runtime: {
    currentPanelId: number;
  };
}
