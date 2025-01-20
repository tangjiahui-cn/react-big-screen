/**
 * 全局配置管理
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理全局的配置项信息，以及各种保存方式
 */

import { getGlobalState, setGlobalState } from "../store";
import { GlobalConfig, GlobalRuntime } from "../types";

export default class Config {
  // 获取配置
  getConfig(): GlobalConfig {
    return getGlobalState().config;
  }

  // 设置配置
  setConfig(config: GlobalConfig | ((value: GlobalConfig) => GlobalConfig)) {
    setGlobalState((state) => {
      return {
        config: {
          ...state.config,
          ...(typeof config === "function" ? config(this.getConfig()) : config),
        },
      };
    });
  }

  // 获取运行时
  getRuntime(): GlobalRuntime {
    return getGlobalState().runtime;
  }

  // 设置运行时
  setRuntime(runtime: GlobalRuntime | ((value: GlobalRuntime) => GlobalRuntime)) {
    setGlobalState((state) => {
      return {
        runtime: {
          ...state.runtime,
          ...(typeof runtime === "function" ? runtime(this.getRuntime()) : runtime),
        },
      };
    });
  }
}
