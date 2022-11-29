import { combineReducers } from 'redux';
import coreSlice from './core';

const rootReducer = combineReducers({ counter: coreSlice.reducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
