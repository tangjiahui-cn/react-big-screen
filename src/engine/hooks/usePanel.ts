/**
 * usePanel
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import engine, { PanelType, useGlobalSelector } from '@/engine';
import { useMemo } from 'react';

export function usePanel(): PanelType | undefined {
  const currentPanelId = useGlobalSelector((state) => {
    return state.runtime.currentPanelId;
  });

  return useMemo(() => {
    return engine.panel.getPanel(currentPanelId);
  }, [currentPanelId]);
}
