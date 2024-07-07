import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeValue } from 'customTypes';

export interface CoreState {
  modalName: string;
  theme: ThemeValue;
}

const coreState: CoreState = {
  modalName: '',
  theme: 'light',
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
    setTheme: (state, action: PayloadAction<ThemeValue>) => {
      state.theme = action.payload;
    },
  },
});

export const coreActions = coreSlice.actions;

export default coreSlice;
