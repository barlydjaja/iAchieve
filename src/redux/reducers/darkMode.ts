import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/index.ts';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const selectIsDarkMode = (state: RootState) => state.darkMode.isDarkMode;

export const { setIsDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
