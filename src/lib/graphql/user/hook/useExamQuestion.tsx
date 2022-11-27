import { useLazyQuery } from '@apollo/client';
import { READ_QUESTION, READ_QUESTIONS_BY_ID } from '../query/questionQuery';
import {
  ReadMockExamQuestionQuery,
  ReadMockExamQuestionQueryVariables,
  ReadMockExamQuestionsByMockExamIdQuery,
  ReadMockExamQuestionsByMockExamIdQueryVariables,
} from '../query/questionQuery.generated';

export const useReadQuestionsByExamId = () =>
  useLazyQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID);

export const useReadQuestion = () =>
  useLazyQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>(
    READ_QUESTION
  );
