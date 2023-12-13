import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExam, MockExamCategory, MockExamQuestion } from 'types';

export interface StorageState {
  moduStorageCategories: MockExamCategory[];
  premiumStorageCategories: MockExamCategory[];
  myStorageCategories: MockExamCategory[];
}

const storageState: StorageState = {
  moduStorageCategories: [],
  premiumStorageCategories: [],
  myStorageCategories: [],
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
  },
});

export const storageActions = storageSlice.actions;

export default storageSlice;
