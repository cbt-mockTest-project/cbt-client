import { setExamSettingHistory } from '@lib/utils/examSettingHistory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ExamSettingType,
  ToggleExamAllSelectPayload,
  ToggleExamSelectPayload,
} from 'customTypes';

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
    toggleExamAllSelect(
      state,
      action: PayloadAction<ToggleExamAllSelectPayload>
    ) {
      const { examIds, categoryId } = action.payload;
      if (state.examSetting.examIds.length === examIds.length) {
        state.examSetting.examIds = [];
        state.examSetting.categoryId = categoryId;
        setExamSettingHistory({
          categoryId,
          examIds: [],
        });
        return;
      }
      state.examSetting.examIds = examIds;
      state.examSetting.categoryId = categoryId;
      setExamSettingHistory({
        categoryId,
        examIds,
      });
    },
    toggleExamSelect(state, action: PayloadAction<ToggleExamSelectPayload>) {
      const { examId, categoryId } = action.payload;
      if (state.examSetting.examIds.includes(examId)) {
        const newSelectedExamIds = state.examSetting.examIds.filter(
          (id) => id !== examId
        );
        state.examSetting.examIds = newSelectedExamIds;
        state.examSetting.categoryId = categoryId;
        setExamSettingHistory({
          categoryId,
          examIds: newSelectedExamIds,
        });
        return;
      }
      const newSelectedExamIds = [...state.examSetting.examIds, examId];
      state.examSetting.examIds = newSelectedExamIds;
      state.examSetting.categoryId = categoryId;
      setExamSettingHistory({
        categoryId,
        examIds: newSelectedExamIds,
      });
    },
  },
});

export const examSettingActions = examSettingSlice.actions;

export default examSettingSlice;
