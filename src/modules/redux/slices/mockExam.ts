import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  SetQuestionFeedbackPayload,
  SetQuestionFeedbacksPayload,
} from 'customTypes';
import { MockExam, MockExamQuestion } from 'types';

export interface MockExamState {
  questions: MockExamQuestion[];
  mockExam: MockExam | null;
}

const mockExamState: MockExamState = {
  questions: [],
  mockExam: null,
};

const mockExamSlice = createSlice({
  name: 'mockExam',
  initialState: mockExamState,
  reducers: {
    setMockExam: (state, action: PayloadAction<MockExam>) => {
      state.mockExam = action.payload;
    },
    setQuestions: (state, action: PayloadAction<MockExamQuestion[]>) => {
      state.questions = action.payload;
    },
    setQuestion(state, action: PayloadAction<MockExamQuestion>) {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          return action.payload;
        }
        return question;
      });
    },
  },
});

export const mockExamActions = mockExamSlice.actions;

export default mockExamSlice;
