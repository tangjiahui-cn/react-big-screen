/**
 * useComponents
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { useSelector } from 'react-redux';
import { ComponentType, GlobalState } from '@/engine';
import { useMemo } from 'react';

export function useComponents(): ComponentType[] {
  const componentMap = useSelector((state: GlobalState) => state?.component?.componentMap);

  return useMemo(() => {
    return componentMap ? Object.values(componentMap) : [];
  }, [componentMap]);
}
