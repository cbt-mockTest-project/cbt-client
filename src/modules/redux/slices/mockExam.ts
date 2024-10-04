import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MockExam, MockExamQuestion, QuestionState } from 'types';

const shuffleQuestions = (
  questions: MockExamQuestion[]
): MockExamQuestion[] => {
  return questions
    .map((el) => {
      if (el.objectiveData) {
        const randomIndexList = [
          ...Array.from(
            { length: el.objectiveData.content.length },
            (_, index) => index + 1
          ),
        ];

        randomIndexList.sort(() => Math.random() - 0.5);
        const shuffledContents = el.objectiveData.content.map(
          (_, index, contentList) => contentList[randomIndexList[index] - 1]
        );
        const shuffledAnswer =
          randomIndexList.indexOf(el.objectiveData.answer) + 1;

        const shuffledMyObjectiveAnswer =
          randomIndexList.indexOf(el.myObjectiveAnswer) + 1;

        const newObjectiveData = {
          content: shuffledContents,
          answer: shuffledAnswer,
        };

        return {
          ...el,
          myObjectiveAnswer: shuffledMyObjectiveAnswer,
          objectiveData: newObjectiveData,
        };
      }
      return el;
    })
    .sort(() => Math.random() - 0.5);
};

export interface MockExamState {
  questions: MockExamQuestion[];
  serverSideQuestions: MockExamQuestion[] | null;
  questionsForScore: MockExamQuestion[];
  isAnswerAllHidden: boolean;
  mockExam: MockExam | null;
  selectedBookmarkFolderId: number;
}

const mockExamState: MockExamState = {
  questions: [],
  questionsForScore: [],
  selectedBookmarkFolderId: 0,
  isAnswerAllHidden: false,
  serverSideQuestions: null,
  mockExam: null,
};

const mockExamSlice = createSlice({
  name: 'mockExam',
  initialState: mockExamState,
  reducers: {
    setQuestions: (
      state,
      action: PayloadAction<{
        questions: MockExamQuestion[];
        order?: string;
      }>
    ) => {
      if (state.questionsForScore.length === 0) {
        state.questionsForScore = action.payload.questions;
      }
      if (action.payload.order === 'random') {
        state.questions = shuffleQuestions(action.payload.questions);
      } else {
        state.questions = action.payload.questions;
      }
    },
    setSelectedBookmarkFolderId: (state, action: PayloadAction<number>) => {
      state.selectedBookmarkFolderId = action.payload;
    },
    filterQuestions: (state, action: PayloadAction<QuestionState[]>) => {
      const states = action.payload;
      state.questions = state.questions.filter((question) =>
        states.includes(question.myQuestionState)
      );
    },
    shuffleQuestions: (state) => {
      state.questions = shuffleQuestions(state.questions);
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
