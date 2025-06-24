/**
 * useConfig
 *
 * @author tangjiahui
 * @date 2024/12/24
 * @description: 获取全局配置
 */
import { GlobalConfig, useGlobalSelector } from "..";

type ChildSelector<T> = (config: GlobalConfig) => T;
export function useConfig<T = GlobalConfig>(childSelector?: ChildSelector<T>): T {
  return useGlobalSelector((state) => {
    if (childSelector) {
      return childSelector(state.config);
    }
    return state.config;
  }) as T;
}
