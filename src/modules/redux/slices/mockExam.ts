import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExam, MockExamQuestion, QuestionState } from 'types';

export interface MockExamState {
  questions: MockExamQuestion[];
  serverSideQuestions: MockExamQuestion[] | null;
  questionsForScore: MockExamQuestion[];
  isAnswerAllHidden: boolean;
  mockExam: MockExam | null;
}

const mockExamState: MockExamState = {
  questions: [],
  questionsForScore: [],
  isAnswerAllHidden: false,
  serverSideQuestions: null,
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
    filterQuestions: (state, action: PayloadAction<QuestionState[]>) => {
      const states = action.payload;
      state.questions = state.questions.filter((question) =>
        states.includes(question.myQuestionState)
      );
    },
    shuffleQuestions: (state) => {
      state.questions = [...state.questions].sort(() => Math.random() - 0.5);
    },
    setQuestion(state, action: PayloadAction<MockExamQuestion>) {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          return action.payload;
        }
        return question;
      });
    },
    setServerSideQuestions: (
      state,
      action: PayloadAction<MockExamQuestion[]>
    ) => {
      state.serverSideQuestions = action.payload;
    },
    setIsAnswerAllHidden: (state, action: PayloadAction<boolean>) => {
      state.isAnswerAllHidden = action.payload;
    },
  },
});

export const mockExamActions = mockExamSlice.actions;

export default mockExamSlice;
