import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  SetCategoryExamsPayload,
  SetCategoryPayload,
  SetMyBookmarkedExamsPayload,
  SetMyExamsPayload,
} from '../../../customTypes';
import { isEqual } from 'lodash';
import { MockExam, MockExamCategory, RevenueRequestForm } from '../../../types';

export interface ExamCategoryState {
  category: MockExamCategory | null;
  originalCategory: MockExamCategory | null;
  originalCategoryExams: MockExam[];
  categoryExams: MockExam[];
  myExams: MockExam[];
  myBookmarkedExams: MockExam[];
  originalMyExams: MockExam[];
  moveRecoverCategory: MockExamCategory | null;
}

const examCategoryState: ExamCategoryState = {
  category: null,
  originalCategory: null,
  originalCategoryExams: null,
  categoryExams: null,
  myExams: [],
  myBookmarkedExams: [],
  originalMyExams: [],
  moveRecoverCategory: null,
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
    setCategoryRevenueRequestForm: (
      state,
      action: PayloadAction<RevenueRequestForm>
    ) => {
      if (!state.category) return;
      state.category.revenueRequestForm = action.payload;
    },
    setMyExams: (state, action: PayloadAction<SetMyExamsPayload>) => {
      const { myExams, shouldUpdateOriginal = true } = action.payload;
      if (isEqual(state.myExams, myExams)) return;
      state.myExams = myExams;
      if (shouldUpdateOriginal) state.originalMyExams = myExams;
    },
    setMyBookmarkedExams: (
      state,
      action: PayloadAction<SetMyBookmarkedExamsPayload>
    ) => {
      const { myBookmarkedExams, shouldUpdateOriginal = true } = action.payload;
      if (isEqual(state.myBookmarkedExams, myBookmarkedExams)) return;
      state.myBookmarkedExams = myBookmarkedExams;
      if (shouldUpdateOriginal) state.originalMyExams = myBookmarkedExams;
    },
    addExamToCategory(state, action: PayloadAction<number>) {
      const examId = action.payload;
      if (!state.categoryExams) return;
      const newExam =
        state.myExams.find((exam) => exam.id === examId) ||
        state.myBookmarkedExams.find((exam) => exam.id === examId);
      const updatedcategoryExams = [newExam, ...state.categoryExams];
      state.categoryExams = updatedcategoryExams;
      state.originalCategoryExams = updatedcategoryExams;
    },
    removeExamFromCategory(state, action: PayloadAction<number>) {
      const examId = action.payload;
      if (!state.categoryExams) return;
      const updatedCategoryExams = state.categoryExams.filter(
        (exam) => exam.id !== examId
      );
      state.categoryExams = updatedCategoryExams;
      state.originalCategoryExams = updatedCategoryExams;
    },
    toggleExamBookmark(state, action: PayloadAction<number>) {
      const examId = action.payload;
      const newExams = state.categoryExams?.map((exam) => {
        if (exam.id === examId) {
          exam.isBookmarked = !exam.isBookmarked;
        }
        return exam;
      });
      state.categoryExams = newExams;
      state.originalCategoryExams = newExams;
    },
    setCategoryExams(state, action: PayloadAction<SetCategoryExamsPayload>) {
      const { categoryExams, shouldUpdateOriginal = true } = action.payload;
      state.categoryExams = categoryExams;
      if (shouldUpdateOriginal) state.originalCategoryExams = categoryExams;
    },
  },
});

export const examCategoryActions = examCategorySlice.actions;

export default examCategorySlice;
