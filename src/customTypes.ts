import { QuestionState } from 'types';
import { ReadMockExamQuestionsByMockExamIdQuery } from './lib/graphql/user/query/questionQuery.generated';
export type QuestionType = Pick<
  ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0],
  'question' | 'question_img' | 'solution' | 'solution_img' | 'number'
> | null;

export type QuestionStateType = 'Core' | 'High' | 'Middle' | 'Row';

export type checkboxOption = {
  value: string | { [key: string]: string | number };
  label: string | JSX.Element;
};

export type SquareCheckboxDefaultValue<T = string> = T | T[];

export type SelectboxArg = { value: string; selected: boolean };
