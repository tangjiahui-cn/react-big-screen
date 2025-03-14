/**
 * 全局配置管理
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理全局的配置项信息，以及各种保存方式
 */

import { getGlobalState, setGlobalState } from "../store";
import { GlobalConfig } from "../types";
import { DEFAULT_PAGE } from "../page";

export default class Config {
  // 获取配置（保存全局）
  public getConfig(): GlobalConfig {
    return getGlobalState().config;
  }

  // 静默设置配置 (不触发全局更新)
  public setConfigSilently(
    config: Partial<GlobalConfig> | ((value: GlobalConfig) => Partial<GlobalConfig>),
  ) {
    this.setConfig(config, { silent: true });
  }

  // 设置配置（保存全局）
  public setConfig(
    config: Partial<GlobalConfig> | ((value: GlobalConfig) => Partial<GlobalConfig>),
    options?: {
      cover?: boolean; // 覆盖
      silent?: boolean; // 不触发全局更新
    },
  ) {
    setGlobalState((state) => {
      // 静默更新（不触发全局更新）
      if (options?.silent) {
        Object.assign(state.config, {
          ...(typeof config === "function" ? config(this.getConfig()) : config),
        });
        return state;
      }
      // 触发全局更新
      return {
        config: options?.cover
          ? ({ ...config } as any)
          : {
              ...state.config,
              ...(typeof config === "function" ? config(this.getConfig()) : config),
            },
      };
    });
  }

  // 获取当前页
  public getCurrentPage() {
    return this.getConfig().currentPageId || DEFAULT_PAGE.id;
  }
}
