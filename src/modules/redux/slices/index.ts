import {
  CombinedState,
  combineReducers,
  PayloadAction,
} from '@reduxjs/toolkit';
import coreSlice, { CoreState } from './core';
import dataSlice, { DataState } from './data';
import { HYDRATE } from 'next-redux-wrapper';

export interface RootState {
  data: DataState;
  core: CoreState;
}

type TCombinedState = CombinedState<RootState> | undefined;

const rootReducer = (
  state: TCombinedState,
  action: PayloadAction<RootState>
): RootState => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        core: coreSlice.reducer,
        data: dataSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
