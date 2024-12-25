/**
 * useComponent
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description get a component by cId.
 */
import engine, { ComponentType } from '@/engine';
import { useMemo } from 'react';

export function useComponent(cId): ComponentType | undefined {
  return useMemo(() => {
    return engine.component.getComponent(cId);
  }, [cId]);
}
