import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/query/questionQuery.generated';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type QuestionListType =
  ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'];

export interface ExamState {
  questionList: QuestionListType;
  currentQuestion: QuestionListType[number] | null;
}

const examState: ExamState = {
  questionList: [],
  currentQuestion: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState: examState,
  reducers: {
    setQuestionList: (state, action: PayloadAction<QuestionListType>) => {
      state.questionList = action.payload;
    },
    setCurrentQuestion: (
      state,
      action: PayloadAction<{
        question: QuestionListType[number];
        updateList?: boolean;
      }>
    ) => {
      state.currentQuestion = action.payload.question;
      if (action.payload.updateList) {
        state.questionList = state.questionList.map((question) => {
          if (question.id === action.payload.question.id) {
            return action.payload.question;
          }
          return question;
        });
      }
    },
  },
});

export const examActions = examSlice.actions;

export default examSlice;
