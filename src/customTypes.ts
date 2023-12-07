import { MockExamQuestionComment, MockExamQuestionFeedback } from './types';
import { QuestionState } from 'types';
import { ReadMockExamQuestionsByMockExamIdQuery } from './lib/graphql/user/query/questionQuery.generated';
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
  mode: ExamMode;
  isRandom: boolean;
  questionStates: QuestionState[];
  limit: number | null;
  examIds: number[];
}

export interface StudyQuery {
  order: 'random' | 'normal';
  states: string;
  limit: string;
  examIds: string;
  mode: ExamMode;
}
