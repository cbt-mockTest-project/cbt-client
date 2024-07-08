import {
  MockExam,
  MockExamCategory,
  MockExamQuestionComment,
  MockExamQuestionFeedback,
  MockExamQuestionImageInputType,
} from './types';
import { QuestionState } from './types';
import { ReadMockExamQuestionsByMockExamIdQuery } from './_lib/graphql/query/questionQuery.generated';
export interface QuestionType
  extends Pick<
    ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0],
    | 'question'
    | 'question_img'
    | 'solution'
    | 'solution_img'
    | 'number'
    | 'id'
    | 'state'
    | 'mockExamQuestionBookmark'
    | 'mockExamQuestionComment'
  > {}

export type QuestionStateType = 'Core' | 'High' | 'Middle' | 'Row';

export type checkboxOption = {
  value: string | number;
  label: string | JSX.Element;
};

export type SquareCheckboxDefaultValue<T = string> = T | T[];

export type SelectboxArg = { value: string; selected: boolean };

export interface MessageType {
  created_at: string;
  message: string;
  room: string;
  username: string;
  clientId: string;
}

export interface ChatUserInfo {
  username: string;
  clientId: string;
}

export enum ExamMode {
  CARD = 'card',
  SOLUTION = 'solution',
  TYPYING = 'typing',
  PRINT = 'print',
}

export interface SetQuestionFeedbackPayload {
  questionId: number;
  feedback: MockExamQuestionFeedback;
}

export interface SetQuestionFeedbacksPayload {
  questionId: number;
  feedbacks: MockExamQuestionFeedback[];
}

export interface ExamSettingType {
  categoryId: number;
  mode?: ExamMode;
  isRandom?: boolean;
  questionStates?: QuestionState[];
  limit?: number | null;
  examIds: number[];
  isMultipleSelectMode?: boolean;
}

export interface ToggleExamAllSelectPayload {
  examIds: number[];
  categoryId: number;
}

export interface ToggleExamSelectPayload {
  examId: number;
  categoryId: number;
}

export interface StudyQuery {
  order: 'random' | 'normal';
  states: string;
  limit: string;
  examIds: string;
  mode: ExamMode;
}

export interface SetCategoryPayload {
  category: MockExamCategory;
  shouldUpdateOriginal?: boolean;
}

export interface SetMyExamsPayload {
  myExams: MockExam[];
  shouldUpdateOriginal?: boolean;
}

export interface SetCategoryExamsPayload {
  categoryExams: MockExam[];
  shouldUpdateOriginal?: boolean;
}
export interface SetMyBookmarkedExamsPayload {
  myBookmarkedExams: MockExam[];
  shouldUpdateOriginal?: boolean;
}

export interface SetStorageCategoriesPayload {
  categories: MockExamCategory[];
  shouldUpdateOriginal?: boolean;
}

export enum StorageType {
  MODU = 'modu',
  PREMIUM = 'premium',
  MY = 'my',
  USER = 'user',
  BOOKMARK = 'bookmark',
  SEARCH = 'search',
}

export interface CreateExamForm {
  questions: CreateQuestionForm[];
  title: string;
  uuid: string;
}
export interface CreateQuestionForm {
  id?: number;
  question?: string;
  solution?: string;
  question_img?: MockExamQuestionImageInputType[];
  solution_img?: MockExamQuestionImageInputType[];
  linkedQuestionIds?: number[];
  orderId: string;
}

export interface CategoryLearingProgressType {
  learningProgress: number;
  highScoreCount: number;
  lowScoreCount: number;
  totalQuestionCount: number;
}

export type ThemeValue = 'light' | 'dark';
