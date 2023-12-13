import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetCategoryPayload } from 'customTypes';
import { MockExamCategory } from 'types';

export interface ExamCategoryState {
  category: MockExamCategory | null;
  originalCategory: MockExamCategory | null;
}

const examCategoryState: ExamCategoryState = {
  category: null,
  originalCategory: null,
};

const examCategorySlice = createSlice({
  name: 'examCategory',
  initialState: examCategoryState,
  reducers: {
    setCategory: (state, action: PayloadAction<SetCategoryPayload>) => {
      const { category, shouldUpdateOriginal = true } = action.payload;
      state.category = category;
      if (shouldUpdateOriginal) state.originalCategory = category;
    },
  },
});

export const examCategoryActions = examCategorySlice.actions;

export default examCategorySlice;
