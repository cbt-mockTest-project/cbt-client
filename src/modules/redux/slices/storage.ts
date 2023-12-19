import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExam, MockExamCategory, MockExamQuestion } from 'types';

export interface StorageState {
  moduStorageCategories: MockExamCategory[] | null;
  premiumStorageCategories: MockExamCategory[] | null;
  myStorageCategories: MockExamCategory[] | null;
  bookmarkedStorageCategories: MockExamCategory[] | null;
  userStorageCategories: MockExamCategory[] | null;
}

const storageState: StorageState = {
  moduStorageCategories: null,
  premiumStorageCategories: null,
  myStorageCategories: null,
  userStorageCategories: null,
  bookmarkedStorageCategories: null,
};

const storageSlice = createSlice({
  name: 'moduStorage',
  initialState: storageState,
  reducers: {
    setModuStorageCategories: (
      state,
      action: PayloadAction<MockExamCategory[]>
    ) => {
      state.moduStorageCategories = action.payload;
    },
    setPremiumStorageCategories: (
      state,
      action: PayloadAction<MockExamCategory[]>
    ) => {
      state.premiumStorageCategories = action.payload;
    },
    setMyStorageCategories: (
      state,
      action: PayloadAction<MockExamCategory[]>
    ) => {
      state.myStorageCategories = action.payload;
    },
    setUserStorageCategories: (
      state,
      action: PayloadAction<MockExamCategory[]>
    ) => {
      state.userStorageCategories = action.payload;
    },
    setBookmarkedStorageCategories: (
      state,
      action: PayloadAction<MockExamCategory[]>
    ) => {
      state.bookmarkedStorageCategories = action.payload;
    },
  },
});

export const storageActions = storageSlice.actions;

export default storageSlice;
