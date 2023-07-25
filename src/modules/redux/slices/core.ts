import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CoreState {
  modalName: string;
}

const coreState: CoreState = {
  modalName: '',
};

const coreSlice = createSlice({
  name: 'core',
  initialState: coreState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalName = action.payload;
    },
    closeModal: (state) => {
      state.modalName = '';
    },
  },
});

export const coreActions = coreSlice.actions;

export default coreSlice;
