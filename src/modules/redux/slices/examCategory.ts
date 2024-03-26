import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetCategoryPayload, SetMyExamsPayload } from 'customTypes';
import { cloneDeep, isEqual } from 'lodash';
import { DropResult } from 'react-beautiful-dnd';
import { MockExam, MockExamCategory } from 'types';

export interface ExamCategoryState {
  category: MockExamCategory | null;
  originalCategory: MockExamCategory | null;
  myExams: MockExam[];
  originalMyExams: MockExam[];
  moveRecoverCategory: MockExamCategory | null;
}

const examCategoryState: ExamCategoryState = {
  category: null,
  originalCategory: null,
  myExams: [],
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
    setMyExams: (state, action: PayloadAction<SetMyExamsPayload>) => {
      const { myExams, shouldUpdateOriginal = true } = action.payload;
      if (isEqual(state.myExams, myExams)) return;
      state.myExams = myExams;
      if (shouldUpdateOriginal) state.originalMyExams = myExams;
    },
    toggleCategoryBookmark: (state) => {
      if (!state.category) return;
      state.category.isBookmarked = !state.category.isBookmarked;
    },
    editCategory(state, action: PayloadAction<Partial<MockExamCategory>>) {
      if (!state.category) return;
      const newCategory = { ...state.category, ...action.payload };
      state.category = newCategory;
      state.originalCategory = newCategory;
    },
    addExamToCategory(state, action: PayloadAction<number>) {
      const examId = action.payload;
      if (!state.category) return;
      const newExam = state.myExams.find((exam) => exam.id === examId);
      const updatedCategory = {
        ...state.category,
        mockExam: [newExam, ...state.category.mockExam],
      } as MockExamCategory;
      state.category = updatedCategory;
      state.originalCategory = updatedCategory;
    },
    removeExamFromCategory(state, action: PayloadAction<number>) {
      const examId = action.payload;
      if (!state.category) return;
      const updatedCategory = {
        ...state.category,
        mockExam: state.category.mockExam.filter((exam) => exam.id !== examId),
      } as MockExamCategory;
      state.category = updatedCategory;
      state.originalCategory = updatedCategory;
    },
    filterExams(state, action: PayloadAction<string>) {
      if (!state.originalCategory) return;
      const keyword = action.payload;
      const filteredCategory = {
        ...state.originalCategory,
        mockExam: state.originalCategory.mockExam.filter((exam) =>
          exam.title.includes(keyword)
        ),
      };
      state.category = filteredCategory;
    },
    filterMyExams(state, action: PayloadAction<string>) {
      if (!state.originalMyExams) return;
      const keyword = action.payload;
      const filteredExams = state.originalMyExams.filter((exam) =>
        exam.title.includes(keyword)
      );
      state.myExams = filteredExams;
    },
    toggleExamBookmark(state, action: PayloadAction<number>) {
      if (!state.category) return;
      const examId = action.payload;
      const newExams = state.category.mockExam.map((exam) => {
        if (exam.id === examId) {
          exam.isBookmarked = !exam.isBookmarked;
        }
        return exam;
      });
      const newCategory = { ...state.category, mockExam: newExams };
      state.category = newCategory;
      state.originalCategory = newCategory;
    },
    moveExamOrder(state, action: PayloadAction<DropResult>) {
      const { destination, source } = action.payload;
      if (!destination) return;
      if (destination.index === source.index) return;
      if (!state.category) return;
      state.moveRecoverCategory = cloneDeep(state.category);
      const newExamList = [...state.category.mockExam];
      const [removed] = newExamList.splice(source.index, 1);
      newExamList.splice(destination.index, 0, removed);
      state.category.mockExam = newExamList;
    },
    recoverExamOrder(state) {
      if (!state.moveRecoverCategory) return;
      state.category = state.moveRecoverCategory;
      state.moveRecoverCategory = null;
    },
  },
});

export const examCategoryActions = examCategorySlice.actions;

export default examCategorySlice;
