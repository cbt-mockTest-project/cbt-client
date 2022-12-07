import { useLazyQuery, useQuery } from '@apollo/client';
import {
  READ_QUESTION,
  READ_QUESTIONS_BY_ID,
  READ_QUESTIONS_BY_STATE,
} from '../query/questionQuery';
import {
  ReadMockExamQuestionQuery,
  ReadMockExamQuestionQueryVariables,
  ReadMockExamQuestionsByMockExamIdQuery,
  ReadMockExamQuestionsByMockExamIdQueryVariables,
  ReadMockExamQuestionsByStateQuery,
  ReadMockExamQuestionsByStateQueryVariables,
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

export const useLazyReadQuestionsByState = () =>
  useLazyQuery<
    ReadMockExamQuestionsByStateQuery,
    ReadMockExamQuestionsByStateQueryVariables
  >(READ_QUESTIONS_BY_STATE);

export const useReadQuestionsByState = (
  variables: ReadMockExamQuestionsByStateQueryVariables
) =>
  useQuery<
    ReadMockExamQuestionsByStateQuery,
    ReadMockExamQuestionsByStateQueryVariables
  >(READ_QUESTIONS_BY_STATE, { variables });
