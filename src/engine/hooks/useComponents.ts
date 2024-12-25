/**
 * useComponents
 *
 * @author tangjiahui
 * @date 2024/12/24
 * @description get all registered components.
 */
import { ComponentType, GlobalState, useGlobalSelector } from '@/engine';
import { useMemo } from 'react';

export function useComponents(): ComponentType[] {
  const componentMap = useGlobalSelector((state) => state.componentMap);

  return useMemo((): ComponentType[] => {
    return componentMap ? Object.values(componentMap) : [];
  }, [componentMap]);
}
