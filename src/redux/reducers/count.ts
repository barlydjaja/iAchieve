import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/index.ts';

export const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const selectCount = (state: RootState) => state.count.count;

export const { increment } = countSlice.actions;

export default countSlice.reducer;
