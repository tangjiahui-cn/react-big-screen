/**
 * component slice.
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from '@/engine';

export interface GlobalStateComponent {
  componentMap: Record<string, ComponentType>;
}

export default createSlice({
  name: 'component',
  initialState: {
    componentMap: {},
  } as GlobalStateComponent,
  reducers: {
    /**
     * register a component
     * @param state
     * @param payload
     */
    registerComponent(state: GlobalStateComponent, { payload }: PayloadAction<ComponentType>) {
      state.componentMap = {
        ...state.componentMap,
        [payload.cId]: payload,
      };
    },
    /**
     * register some components.
     * @param state
     * @param payload
     */
    registerComponentList(
      state: GlobalStateComponent,
      { payload }: PayloadAction<ComponentType[]>,
    ) {
      state.componentMap = {
        ...state.componentMap,
        ...payload.reduce((result, cur) => {
          result[cur.cId] = cur;
          return result;
        }, {}),
      };
    },
  },
});
