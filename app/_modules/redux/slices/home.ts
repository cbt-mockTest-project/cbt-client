import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetStorageCategoriesPayload } from '../../../customTypes';
import { MockExam, MockExamCategory, MockExamQuestion } from '../../../types';

export interface HomeState {
  moduStorageCategories: MockExamCategory[] | null;
  ehsStorageCategories: MockExamCategory[] | null;
  userStorageCategories: MockExamCategory[] | null;
  recentlyStudiedCategories: MockExamCategory[] | null;
  bookmarkedCategories: MockExamCategory[] | null;
  isPickedCategories: MockExamCategory[] | null;
}

const storageState: HomeState = {
  moduStorageCategories: null,
  ehsStorageCategories: null,
  userStorageCategories: null,
  recentlyStudiedCategories: null,
  bookmarkedCategories: null,
  isPickedCategories: null,
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
    setRecentlyStudiedCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories } = action.payload;
      state.recentlyStudiedCategories = categories;
    },
    setBookmarkedCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories } = action.payload;
      state.bookmarkedCategories = categories;
    },
    setIsPickedCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories } = action.payload;
      state.isPickedCategories = categories;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice;
