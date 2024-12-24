import { useSelector } from 'react-redux';
import { GlobalState } from '@/engine';

/**
 * useConfig
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
export function useConfig() {
  return useSelector((state: GlobalState) => state.config);
}
