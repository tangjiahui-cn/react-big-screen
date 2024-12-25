import { useGlobalSelector } from '@/engine';

/**
 * useConfig
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
export function useConfig() {
  return useGlobalSelector((state) => state.config);
}
