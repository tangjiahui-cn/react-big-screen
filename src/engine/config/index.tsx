/**
 * config
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { getGlobalState, setGlobalState, GlobalConfig } from '@/engine';

export class Config {
  /**
   * set config
   * @param value global config.
   */
  setConfig(value: GlobalConfig | ((value: GlobalConfig) => GlobalConfig)): void {
    setGlobalState({
      config: typeof value === 'function' ? value(this.getConfig()) : value,
    });
  }

  /**
   * get config.
   */
  getConfig(): GlobalConfig {
    return getGlobalState().config;
  }
}
