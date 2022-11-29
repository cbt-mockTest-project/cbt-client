import { ReadMockExamQuestionsByMockExamIdQuery } from './lib/graphql/user/query/questionQuery.generated';
export type QuestionType = Pick<
  ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0],
  'question' | 'question_img' | 'solution' | 'solution_img' | 'number'
> | null;

export type QuestionStateType = 'CORE' | 'HIGH' | 'MIDDLE' | 'ROW';

export type checkbokOption = {
  value: string;
  label: string | JSX.Element;
};
