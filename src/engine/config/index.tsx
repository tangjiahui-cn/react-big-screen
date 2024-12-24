/**
 * config
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { configActions, getGlobalState, globalDispatch } from '@/engine';
import { GlobalConfig } from '@/engine/type.ts';

export interface GlobalConfig {
  width: number;
  height: number;
}

export class Config {
  /**
   * set config
   * @param config global config.
   */
  setConfig(config: GlobalConfig | ((config: GlobalConfig) => GlobalConfig)) {
    const target = typeof config === 'function' ? config(this.getConfig()) : config;
    globalDispatch(configActions.setConfig(target));
  }

  /**
   * get config.
   */
  getConfig() {
    return getGlobalState().config;
  }
}
