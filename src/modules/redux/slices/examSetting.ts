import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExamSettingType } from 'customTypes';

export interface ExamSettingState {
  examSetting: ExamSettingType;
}

const examSettingState: ExamSettingState = {
  examSetting: {
    categoryId: 0,
    examIds: [],
  },
};

const examSettingSlice = createSlice({
  name: 'examSetting',
  initialState: examSettingState,
  reducers: {
    setExamSetting(state, action: PayloadAction<Partial<ExamSettingType>>) {
      const { categoryId, mode, isRandom, questionStates, limit, examIds } =
        action.payload;
      if (typeof categoryId === 'number')
        state.examSetting.categoryId = categoryId;
      if (mode) state.examSetting.mode = mode;
      if (isRandom) state.examSetting.isRandom = isRandom;
      if (questionStates) state.examSetting.questionStates = questionStates;
      if (limit) state.examSetting.limit = limit;
      if (examIds) state.examSetting.examIds = examIds;
    },
  },
});

export const examSettingActions = examSettingSlice.actions;

export default examSettingSlice;
