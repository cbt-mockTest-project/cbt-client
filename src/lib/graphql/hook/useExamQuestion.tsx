import {
  OperationVariables,
  QueryOptions,
  useLazyQuery,
  useMutation,
  useQuery,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import {
  CREATE_MOCK_EXAM_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  READ_ALL_QUESTION,
  READ_QUESTION,
  READ_QUESTIONS_BY_EXAM_IDS,
  READ_QUESTIONS_BY_ID,
  READ_QUESTIONS_BY_STATE,
  READ_QUESTION_NUMBERS,
  SEARCH_QEUSTIONS,
} from '../query/questionQuery';
import {
  CreateMockExamQuestionMutation,
  CreateMockExamQuestionMutationVariables,
  DeleteMockExamQuestionMutation,
  DeleteMockExamQuestionMutationVariables,
  EditMockExamQuestionMutation,
  EditMockExamQuestionMutationVariables,
  ReadAllMockExamQuestionQuery,
  ReadAllMockExamQuestionQueryVariables,
  ReadMockExamQuestionNumbersQuery,
  ReadMockExamQuestionNumbersQueryVariables,
  ReadMockExamQuestionQuery,
  ReadMockExamQuestionQueryVariables,
  ReadMockExamQuestionsByMockExamIdQuery,
  ReadMockExamQuestionsByMockExamIdQueryVariables,
  ReadMockExamQuestionsByStateQuery,
  ReadMockExamQuestionsByStateQueryVariables,
  ReadQuestionsByExamIdsQuery,
  ReadQuestionsByExamIdsQueryVariables,
  SearchQuestionsByKeywordQuery,
  SearchQuestionsByKeywordQueryVariables,
} from '../query/questionQuery.generated';
import { ReadMockExamQuestionInput, ReadQuestionsByExamIdsInput } from 'types';

export const useLazyReadQuestionsByExamId = (
  fetchPolicy: WatchQueryFetchPolicy
) =>
  useLazyQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID, { fetchPolicy });

export const useReadQuestionsByExamId = (id: number) =>
  useQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID, {
    variables: { input: { id } },
  });

export const useReadQuestion = (input: ReadMockExamQuestionInput) =>
  useQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>(
    READ_QUESTION,
    {
      variables: {
        input,
      },
    }
  );

export const useLazyReadQuestion = (fetchPolicy: WatchQueryFetchPolicy) =>
  useLazyQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>(
    READ_QUESTION,
    { fetchPolicy }
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

export const useLazyReadAllQuestions = () =>
  useLazyQuery<
    ReadAllMockExamQuestionQuery,
    ReadAllMockExamQuestionQueryVariables
  >(READ_ALL_QUESTION);

export const useLazyReadQuestionNumbers = () =>
  useLazyQuery<
    ReadMockExamQuestionNumbersQuery,
    ReadMockExamQuestionNumbersQueryVariables
  >(READ_QUESTION_NUMBERS);

export const useCreateQusetion = () =>
  useMutation<
    CreateMockExamQuestionMutation,
    CreateMockExamQuestionMutationVariables
  >(CREATE_MOCK_EXAM_QUESTION);

export const useEditQuestion = () =>
  useMutation<
    EditMockExamQuestionMutation,
    EditMockExamQuestionMutationVariables
  >(EDIT_QUESTION);

export const useDeleteQuestion = () =>
  useMutation<
    DeleteMockExamQuestionMutation,
    DeleteMockExamQuestionMutationVariables
  >(DELETE_QUESTION);

export const useLzaySearchQuestions = () =>
  useLazyQuery<
    SearchQuestionsByKeywordQuery,
    SearchQuestionsByKeywordQueryVariables
  >(SEARCH_QEUSTIONS);

export const useReadQuestionsByExamIds = (input: ReadQuestionsByExamIdsInput) =>
  useQuery<ReadQuestionsByExamIdsQuery, ReadQuestionsByExamIdsQueryVariables>(
    READ_QUESTIONS_BY_EXAM_IDS,
    {
      variables: {
        input,
      },
    }
  );

export const useLazyReadQuestionsByExamIds = () =>
  useLazyQuery<
    ReadQuestionsByExamIdsQuery,
    ReadQuestionsByExamIdsQueryVariables
  >(READ_QUESTIONS_BY_EXAM_IDS);
