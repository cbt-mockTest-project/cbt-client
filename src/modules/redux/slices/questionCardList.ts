import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QuestionCardListState {
  page: number;
  totalCount: number;
}

const questionCardListState: QuestionCardListState = {
  page: 1,
  totalCount: 0,
};

const questionCardListSlice = createSlice({
  name: 'questionCardList',
  initialState: questionCardListState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const questionCardListActions = questionCardListSlice.actions;

export default questionCardListSlice;
