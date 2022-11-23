import { useLazyQuery } from '@apollo/client';
import { READ_QUESTIONS_BY_TITLE } from '../query/questionQuery';
import {
  ReadMockExamQuestionsByMockExamTitleQuery,
  ReadMockExamQuestionsByMockExamTitleQueryVariables,
} from '../query/questionQuery.generated';

export const useReadQuestionsByExamTitle = () =>
  useLazyQuery<
    ReadMockExamQuestionsByMockExamTitleQuery,
    ReadMockExamQuestionsByMockExamTitleQueryVariables
  >(READ_QUESTIONS_BY_TITLE);
