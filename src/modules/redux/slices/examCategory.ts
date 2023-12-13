import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetCategoryPayload, SetMyExamsPayload } from 'customTypes';
import { MockExam, MockExamCategory } from 'types';

export interface ExamCategoryState {
  category: MockExamCategory | null;
  originalCategory: MockExamCategory | null;
  myExams: MockExam[];
  originalMyExams: MockExam[];
}

const examCategoryState: ExamCategoryState = {
  category: null,
  originalCategory: null,
  myExams: [],
  originalMyExams: [],
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
    setMyExams: (state, action: PayloadAction<SetMyExamsPayload>) => {
      const { myExams, shouldUpdateOriginal = true } = action.payload;
      state.myExams = myExams;
      if (shouldUpdateOriginal) state.originalMyExams = myExams;
    },
  },
});

export const examCategoryActions = examCategorySlice.actions;

export default examCategorySlice;
