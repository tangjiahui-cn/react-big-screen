/**
 * global store
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { create } from 'zustand';
import { GlobalState } from './types';

export const useGlobalSelector = create<GlobalState>(() => {
  return {
    componentMap: {},
    config: {
      width: 1920,
      height: 1080,
    },
  };
});

export function setGlobalState(setFn: GlobalState | ((state: GlobalState) => GlobalState)) {
  useGlobalSelector.setState(setFn);
}

export function getGlobalState() {
  return useGlobalSelector.getState();
}
