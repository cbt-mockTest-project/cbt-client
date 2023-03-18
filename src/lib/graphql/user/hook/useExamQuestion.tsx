import {
  useLazyQuery,
  useMutation,
  useQuery,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import {
  CREATE_MOCK_EXAM_QUESTION,
  EDIT_QUESTION,
  READ_ALL_QUESTION,
  READ_QUESTION,
  READ_QUESTIONS_BY_ID,
  READ_QUESTIONS_BY_STATE,
  READ_QUESTION_NUMBERS,
} from '../query/questionQuery';
import {
  CreateMockExamQuestionMutation,
  CreateMockExamQuestionMutationVariables,
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
} from '../query/questionQuery.generated';

export const useLazyReadQuestionsByExamId = (
  fetchPolicy: WatchQueryFetchPolicy
) =>
  useLazyQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID, { fetchPolicy });

export const useReadQuestionsByExamId = () =>
  useQuery<
    ReadMockExamQuestionsByMockExamIdQuery,
    ReadMockExamQuestionsByMockExamIdQueryVariables
  >(READ_QUESTIONS_BY_ID);

export const useReadQuestion = () =>
  useQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>(
    READ_QUESTION
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
