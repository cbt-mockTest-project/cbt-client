import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Item } from 'types';

export interface StoreItemState {
  item: Item | null;
}

const storeItemState: StoreItemState = {
  item: null,
};

const storeItemSlice = createSlice({
  name: 'storeItem',
  initialState: storeItemState,
  reducers: {
    setItem: (state, action: PayloadAction<Item>) => {
      state.item = action.payload;
    },
  },
});

export const storeItemActions = storeItemSlice.actions;

export default storeItemSlice;
