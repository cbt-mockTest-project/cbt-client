import { ReadMockExamQuestionsByMockExamIdQuery } from './lib/graphql/user/query/questionQuery.generated';
export type QuestionType = Pick<
  ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0],
  'question' | 'question_img' | 'solution' | 'solution_img' | 'number'
> | null;
