import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExamQuestion } from '../../../types';

export interface MockExamState {
  question: MockExamQuestion | null;
}

const questionState: MockExamState = {
  question: null,
};

const questionSlice = createSlice({
  name: 'question',
  initialState: questionState,
  reducers: {
    setQuestion: (state, action: PayloadAction<MockExamQuestion>) => {
      state.question = action.payload;
    },
  },
});

export const questionActions = questionSlice.actions;

export default questionSlice;
