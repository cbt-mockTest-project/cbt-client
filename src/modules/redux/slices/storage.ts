import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetStorageCategoriesPayload } from 'customTypes';
import { MockExam, MockExamCategory, MockExamQuestion } from 'types';

export interface StorageState {
  moduStorageCategories: MockExamCategory[] | null;
  originalModuStorageCategories: MockExamCategory[] | null;
  premiumStorageCategories: MockExamCategory[] | null;
  originalPremiumStorageCategories: MockExamCategory[] | null;
  myStorageCategories: MockExamCategory[] | null;
  originalMyStorageCategories: MockExamCategory[] | null;
  bookmarkedStorageCategories: MockExamCategory[] | null;
  originalBookmarkedStorageCategories: MockExamCategory[] | null;
  userStorageCategories: MockExamCategory[] | null;
  originalUserStorageCategories: MockExamCategory[] | null;
  searchCategories: MockExamCategory[] | null;
  originalSearchCategories: MockExamCategory[] | null;
  setMyCategoriesLoading: boolean;
}

const storageState: StorageState = {
  moduStorageCategories: null,
  premiumStorageCategories: null,
  myStorageCategories: null,
  userStorageCategories: null,
  bookmarkedStorageCategories: null,
  originalModuStorageCategories: null,
  originalPremiumStorageCategories: null,
  originalMyStorageCategories: null,
  originalBookmarkedStorageCategories: null,
  originalUserStorageCategories: null,
  searchCategories: null,
  originalSearchCategories: null,
  setMyCategoriesLoading: false,
};

const storageSlice = createSlice({
  name: 'moduStorage',
  initialState: storageState,
  reducers: {
    setModuStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.moduStorageCategories = categories;
      if (shouldUpdateOriginal)
        state.originalModuStorageCategories = categories;
    },
    setPremiumStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.premiumStorageCategories = categories;
      if (shouldUpdateOriginal)
        state.originalPremiumStorageCategories = categories;
    },
    setMyCategoriesLoading: (state) => {
      state.setMyCategoriesLoading = true;
    },
    setMyStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.myStorageCategories = categories;
      if (shouldUpdateOriginal) state.originalMyStorageCategories = categories;
      state.setMyCategoriesLoading = false;
    },

    setUserStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.userStorageCategories = categories;
      if (shouldUpdateOriginal)
        state.originalUserStorageCategories = categories;
    },
    setSearchCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.searchCategories = categories;
      if (shouldUpdateOriginal) state.originalSearchCategories = categories;
    },
    setBookmarkedStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.bookmarkedStorageCategories = categories;
      if (shouldUpdateOriginal)
        state.originalBookmarkedStorageCategories = categories;
    },
  },
});

export const storageActions = storageSlice.actions;

export default storageSlice;
