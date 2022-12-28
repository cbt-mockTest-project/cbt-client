import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ReadMyExamQuestionStateInput } from 'types';
import {
  ReadMockExamTitlesByCateoryQuery,
  ReadMockExamTitlesByCateoryQueryVariables,
} from '../query/examQuery.generated';
import {
  CREATE_OR_UPDATE_QUESTION_STATE,
  READ_QUESTION_STATE_QUERY,
  RESET_QUESTION_STATE_MUTATION,
} from '../query/questionStateQuery';
import {
  CreateOrUpdateMockExamQuestionStateMutation,
  CreateOrUpdateMockExamQuestionStateMutationVariables,
  ReadMyExamQuestionStateQuery,
  ReadMyExamQuestionStateQueryVariables,
  ResetMyExamQuestionStateMutation,
  ResetMyExamQuestionStateMutationVariables,
} from '../query/questionStateQuery.generated';

export const useChangeQuestionState = () =>
  useMutation<
    CreateOrUpdateMockExamQuestionStateMutation,
    CreateOrUpdateMockExamQuestionStateMutationVariables
  >(CREATE_OR_UPDATE_QUESTION_STATE);

export const useResetQuestionState = () =>
  useMutation<
    ResetMyExamQuestionStateMutation,
    ResetMyExamQuestionStateMutationVariables
  >(RESET_QUESTION_STATE_MUTATION);

export const useLazyReadQuestionState = (input: ReadMyExamQuestionStateInput) =>
  useLazyQuery<
    ReadMyExamQuestionStateQuery,
    ReadMyExamQuestionStateQueryVariables
  >(READ_QUESTION_STATE_QUERY, {
    variables: { input },
  });
