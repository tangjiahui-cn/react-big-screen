/**
 * config slice.
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalConfig } from '@/engine';

export default createSlice({
  name: 'config',
  initialState: {
    width: 1920,
    height: 1080,
  } as GlobalConfig,
  reducers: {
    /**
     * load config.
     */
    setConfig(state: GlobalConfig, { payload }: PayloadAction<GlobalConfig>) {
      Object.assign(state, payload);
    },
  },
});
