/**
 * useConfig
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { useGlobalSelector } from '@/engine';

export function useConfig() {
  return useGlobalSelector((state) => state.config);
}
