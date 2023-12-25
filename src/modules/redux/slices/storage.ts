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
    setMyStorageCategories: (
      state,
      action: PayloadAction<SetStorageCategoriesPayload>
    ) => {
      const { categories, shouldUpdateOriginal = true } = action.payload;
      state.myStorageCategories = categories;
      if (shouldUpdateOriginal) state.originalMyStorageCategories = categories;
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
