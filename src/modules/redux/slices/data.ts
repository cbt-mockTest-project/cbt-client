import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from 'types';

interface DataListQuery {
  page: number;
  totalCount: number;
  scrollY: number;
}

export interface DataState {
  dataList: Post[];
  dataDetail: Post | null;
  dataListQuery: DataListQuery;
}

const dataState: DataState = {
  dataList: [],
  dataDetail: null,
  dataListQuery: {
    page: 1,
    totalCount: 1,
    scrollY: 0,
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState: dataState,
  reducers: {
    setDataList: (state, action: PayloadAction<Post[]>) => {
      state.dataList = action.payload;
    },
    setDataListQuery: (state, action: PayloadAction<DataListQuery>) => {
      state.dataListQuery = action.payload;
    },
    setDataListQueryScrollY: (state, action: PayloadAction<number>) => {
      state.dataListQuery.scrollY = action.payload;
    },
    setDataDetail: (state, action: PayloadAction<Post>) => {
      state.dataDetail = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
