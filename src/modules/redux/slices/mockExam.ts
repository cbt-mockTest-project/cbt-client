import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExam, MockExamQuestion } from 'types';

export interface MockExamState {
  questions: MockExamQuestion[];
  tempQuestionsForSolution: MockExamQuestion[];
  questionsForScore: MockExamQuestion[];
  mockExam: MockExam | null;
}

const mockExamState: MockExamState = {
  questions: [],
  questionsForScore: [],
  tempQuestionsForSolution: [],
  mockExam: null,
};

const mockExamSlice = createSlice({
  name: 'mockExam',
  initialState: mockExamState,
  reducers: {
    setQuestions: (state, action: PayloadAction<MockExamQuestion[]>) => {
      if (state.questionsForScore.length === 0) {
        state.questionsForScore = action.payload;
      }
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
    setTempQuestionsForSolution: (
      state,
      action: PayloadAction<MockExamQuestion[]>
    ) => {
      state.tempQuestionsForSolution = action.payload;
    },
    setQuestionsForScore: (
      state,
      action: PayloadAction<MockExamQuestion[]>
    ) => {
      state.questionsForScore = action.payload;
    },
    setQuestionForScore(state, action: PayloadAction<MockExamQuestion>) {
      state.questionsForScore = state.questionsForScore.map((question) => {
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
