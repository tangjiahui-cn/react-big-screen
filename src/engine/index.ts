/**
 * Engine
 *
 * @author tangjiahui
 * @date 2024/12/21
 * @description instance = component + componentState
 */
import { Config } from './config';
import { Component } from './component';
import type { JsonType } from './type.ts';
import { getGlobalState, GlobalState } from './store';

export type * from './component';
export type * from './config';
export * from './store';

class Engine {
  config: Config = new Config();
  component: Component = new Component();
  componentStates: any[] = [];
  panelStates: any[] = [];

  /**
   * load json text.
   * @param jsonText stringify json text.
   */
  loadJSON(jsonText: string): void {
    try {
      const json: JsonType = JSON.parse(jsonText) as JsonType;
      this.config.setConfig(json.config);
      this.componentStates = json.componentStates;
      this.panelStates = json.panelStates;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * get json.
   * @return json object.
   */
  getJSON(): JsonType {
    return {
      config: this.config.getConfig(),
      componentStates: this.componentStates,
      panelStates: this.panelStates,
    };
  }

  /**
   * get global state
   * @return global state.
   */
  getGlobalState(): GlobalState {
    return getGlobalState();
  }
}

const engine: Engine = new Engine();
export default engine;
