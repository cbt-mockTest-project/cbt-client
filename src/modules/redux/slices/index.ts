import { combineReducers } from 'redux';
import coreSlice from './core';
import dataSlice from './data';

const rootReducer = combineReducers({
  core: coreSlice.reducer,
  data: dataSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
