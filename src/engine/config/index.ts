/**
 * 全局配置管理
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理全局的配置项信息，以及各种保存方式
 */

import { getGlobalState, setGlobalState } from "../store";
import { GlobalConfig } from "../types";

export default class Config {
  // 获取配置
  getConfig(): GlobalConfig {
    return getGlobalState().config;
  }

  // 设置配置
  setConfig(config: GlobalConfig | ((value: GlobalConfig) => GlobalConfig)) {
    setGlobalState({
      config: typeof config === "function" ? config(this.getConfig()) : config,
    });
  }
}
