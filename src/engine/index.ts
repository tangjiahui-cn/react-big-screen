/**
 * Engine
 *
 * @author tangjiahui
 * @date 2024/12/21
 * @description instance = component + componentData
 */
import { Config } from './config';
import { Component } from './component';
import { Panel } from './panel';
import type { JsonType } from './type';
import { getGlobalState, setGlobalState } from './store';

export type * from './component';
export type * from './type';
export * from './store';
export * from './hooks';

class Engine {
  config: Config = new Config();
  component: Component = new Component();
  panel: Panel = new Panel();

  /**
   * load json text.
   * @param jsonText stringify json text.
   */
  loadJSON(jsonText: string): void {
    try {
      const json: JsonType = JSON.parse(jsonText) as JsonType;
      this.config.setConfig(json.config);
      this.panel.setPanels(json.panels);
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
      panels: this.panel.getPanels(),
    };
  }

  /**
   * get global state
   * @return global state.
   */
  getGlobalState = getGlobalState;

  /**
   * set global state
   */
  setGlobalState = setGlobalState;
}

const engine: Engine = new Engine();
export default engine;
