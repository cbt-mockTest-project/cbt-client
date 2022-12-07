import { createSlice } from '@reduxjs/toolkit';

interface CoreState {
  modalState: boolean;
}

const coreState: CoreState = {
  modalState: false,
};

const coreSlice = createSlice({
  name: 'core',
  initialState: coreState,
  reducers: {
    openModal: (state) => {
      state.modalState = true;
    },
    closeModal: (state) => {
      state.modalState = false;
    },
  },
});

export const coreActions = coreSlice.actions;

export default coreSlice;
