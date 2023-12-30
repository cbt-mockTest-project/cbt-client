import {
  CombinedState,
  combineReducers,
  PayloadAction,
} from '@reduxjs/toolkit';
import coreSlice, { CoreState } from './core';
import dataSlice, { DataState } from './data';
import { HYDRATE } from 'next-redux-wrapper';
import { cloneDeep } from 'lodash';
import examSlice, { ExamState } from './exam';
import mockExamSlice, { MockExamState } from './mockExam';
import examSettingSlice, { ExamSettingState } from './examSetting';
import examCategorySlice, { ExamCategoryState } from './examCategory';
import storageSlice, { StorageState } from './storage';
import examCreateSlice, { ExamCreateState } from './examCreate';

export interface RootState {
  data: DataState;
  core: CoreState;
  exam: ExamState;
  mockExam: MockExamState;
  storage: StorageState;
  examSetting: ExamSettingState;
  examCategory: ExamCategoryState;
  examCreate: ExamCreateState;
}

type TCombinedState = CombinedState<RootState> | undefined;

const rootReducer = (
  state: TCombinedState,
  action: PayloadAction<RootState>
): RootState => {
  switch (action.type) {
    case HYDRATE:
      const result = cloneDeep(action.payload);
      if (state) {
        result.data.dataList = state.data.dataList;
        result.data.dataListQuery = state.data.dataListQuery;
      }
      return result;
    default: {
      const combineReducer = combineReducers({
        core: coreSlice.reducer,
        data: dataSlice.reducer,
        exam: examSlice.reducer,
        mockExam: mockExamSlice.reducer,
        storage: storageSlice.reducer,
        examSetting: examSettingSlice.reducer,
        examCategory: examCategorySlice.reducer,
        examCreate: examCreateSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
