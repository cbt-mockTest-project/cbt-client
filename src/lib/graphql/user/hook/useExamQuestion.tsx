import { useLazyQuery, useQuery } from '@apollo/client';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';
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

export const useLazyReadQuestionsByExamId = () =>
  useLazyQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID, {
    fetchPolicy: 'no-cache',
  });

export const useReadQuestionsByExamIdQuery = (
  input: ReadMockExamQuestionsByMockExamIdInput
) =>
  useQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID, {
    variables: { input },
    fetchPolicy: 'network-only',
  });

export const useLazyReadQuestionsByExamIdQuery = () =>
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
