/**
 * useConfig
 *
 * @author tangjiahui
 * @date 2024/12/24
 * @description: 获取全局配置
 */
import { useGlobalSelector } from '..';

export function useConfig() {
  return useGlobalSelector((state) => state.config);
}
