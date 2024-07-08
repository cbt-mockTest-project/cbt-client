import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post, PostComment } from '../../../types';

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
    updateDataList: (state, action: PayloadAction<Post>) => {
      state.dataList = state.dataList.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    setDataDetailComment: (
      state,
      action: PayloadAction<{ comment: PostComment; postId: number }>
    ) => {
      if (state.dataDetail?.comment) {
        state.dataDetail.comment = [
          action.payload.comment,
          ...state.dataDetail.comment,
        ];
      }
    },
    deleteDataDetailComment: (state, action: PayloadAction<number>) => {
      if (state.dataDetail?.comment) {
        state.dataDetail.comment = state.dataDetail.comment.filter(
          (comment) => comment.id !== action.payload
        );
      }
    },
    resetDataList: (state) => {
      state.dataList = dataState.dataList;
      state.dataListQuery = dataState.dataListQuery;
    },
    setDataDetail: (state, action: PayloadAction<Post>) => {
      state.dataDetail = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
