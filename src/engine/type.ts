import { GlobalConfig } from './store';

export interface JsonType {
  /** global config. */
  config: GlobalConfig;
  /** panel list. */
  panels: PanelType[];
}

export interface ComponentData {
  /** unique id */
  id: string;
  /** component id */
  cId: string;
  /** x coordinate */
  x: number;
  /** y coordinate */
  y: number;
  /** width */
  width: number;
  /** height */
  height: number;
  /** component options */
  options: Record<string, any>;
}

export interface PanelType {
  /** unique panel id */
  panelId: string;
  /** panel name */
  name: string;
  /** panel children.(a componentData list.) */
  children: ComponentData[];
}
