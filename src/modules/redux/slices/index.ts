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
import moduStorageSlice, { ModuStorageState } from './moduStorage';

export interface RootState {
  data: DataState;
  core: CoreState;
  exam: ExamState;
  mockExam: MockExamState;
  moduStorage: ModuStorageState;
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
        moduStorage: moduStorageSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
