import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetStorageCategoriesPayload } from 'customTypes';
import { MockExam, MockExamCategory, MockExamQuestion } from 'types';

export interface HomeState {
  moduStorageCategories: MockExamCategory[] | null;
  ehsStorageCategories: MockExamCategory[] | null;
  userStorageCategories: MockExamCategory[] | null;
}

const storageState: HomeState = {
  moduStorageCategories: null,
  ehsStorageCategories: null,
  userStorageCategories: null,
};

const homeSlice = createSlice({
  name: 'moduStorage',
  initialState: storageState,
  reducers: {
    setModuStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories } = action.payload;
      state.moduStorageCategories = categories;
    },
    setEhsStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories } = action.payload;
      state.ehsStorageCategories = categories;
    },
    setUserStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories } = action.payload;
      state.userStorageCategories = categories;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice;
