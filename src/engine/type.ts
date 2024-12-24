export interface ConfigType {}

export interface ComponentStateType {}

export interface PanelStateType {}

export interface JsonType {
  /** panels configs */
  panelStates: PanelStateType[];
  /** all used component state. */
  componentStates: componentStateType[];
  /** global config. */
  config: ConfigType;
}
