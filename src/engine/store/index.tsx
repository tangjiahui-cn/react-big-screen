/**
 * global store
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { create } from 'zustand';
import { GlobalState } from './types';

export type * from './types';
export const useGlobalSelector = create<GlobalState>(() => {
  return {
    panels: [],
    componentMap: {},
    config: {
      width: 1920,
      height: 1080,
    },
    runtime: {
      currentPanelId: '',
    },
  };
});

export function setGlobalState(
  setFn: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>),
) {
  useGlobalSelector.setState(setFn);
}

export function getGlobalState() {
  return useGlobalSelector.getState();
}
