import { createSlice } from '@reduxjs/toolkit';

export interface ExamCreateState {
  savedTime: string;
}

const examCreateState: ExamCreateState = {
  savedTime: '',
};

const examCreateSlice = createSlice({
  name: 'examCreate',
  initialState: examCreateState,
  reducers: {
    setSavedTime(state, action) {
      state.savedTime = action.payload;
    },
  },
});

export const examCreateActions = examCreateSlice.actions;

export default examCreateSlice;
