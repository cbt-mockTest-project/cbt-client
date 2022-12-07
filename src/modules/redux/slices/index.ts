import { combineReducers } from 'redux';
import coreSlice from './core';

const rootReducer = combineReducers({ core: coreSlice.reducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
