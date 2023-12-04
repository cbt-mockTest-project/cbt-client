import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExam, MockExamCategory, MockExamQuestion } from 'types';

export interface ModuStorageState {
  categories: MockExamCategory[];
}

const moduStorageState: ModuStorageState = {
  categories: [],
};

const moduStorageSlice = createSlice({
  name: 'moduStorage',
  initialState: moduStorageState,
  reducers: {
    setCategories: (state, action: PayloadAction<MockExamCategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const moduStorageActions = moduStorageSlice.actions;

export default moduStorageSlice;
