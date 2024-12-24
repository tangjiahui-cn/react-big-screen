/**
 * global store.
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import componentSlice, { GlobalStateComponent } from './component.ts';
import configSlice from './config.ts';
import { GlobalConfig } from '@/engine';

// types
export interface GlobalState {
  component: GlobalStateComponent;
  config: GlobalConfig;
}

// store
const globalStore = configureStore<GlobalState>({
  reducer: {
    component: componentSlice.reducer,
    config: configSlice.reducer,
  },
});

// React FC.
export const GlobalProvider = ({ children }) => {
  return <Provider store={globalStore}>{children}</Provider>;
};

// functions.
export const globalDispatch: Dispatch<any> = globalStore.dispatch;
export const getGlobalState: () => GlobalState = globalStore.getState;

// actions
export const componentActions = componentSlice.actions;
export const configActions = configSlice.actions;
