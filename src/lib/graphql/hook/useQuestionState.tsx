import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ReadMyExamQuestionStateInput } from 'types';

import {
  CREATE_OR_UPDATE_QUESTION_STATE,
  READ_EXAM_TITLE_AND_ID_BY_QUESTION_STATE,
  READ_QUESTION_STATE_QUERY,
  RESET_MY_ALL_QUESTION_STATE,
  RESET_QUESTION_STATE_MUTATION,
} from '../query/questionStateQuery';
import {
  CreateOrUpdateMockExamQuestionStateMutation,
  CreateOrUpdateMockExamQuestionStateMutationVariables,
  ReadExamTitleAndIdByQuestionStateQuery,
  ReadExamTitleAndIdByQuestionStateQueryVariables,
  ReadMyExamQuestionStateQuery,
  ReadMyExamQuestionStateQueryVariables,
  ResetMyExamQuestionStateMutation,
  ResetMyExamQuestionStateMutationVariables,
  RestMyAllQuestionStatesMutation,
  RestMyAllQuestionStatesMutationVariables,
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

export const useReadExamTitleAndIdByState = () =>
  useQuery<
    ReadExamTitleAndIdByQuestionStateQuery,
    ReadExamTitleAndIdByQuestionStateQueryVariables
  >(READ_EXAM_TITLE_AND_ID_BY_QUESTION_STATE);

export const useResetAllQuestionState = () =>
  useMutation<
    RestMyAllQuestionStatesMutation,
    RestMyAllQuestionStatesMutationVariables
  >(RESET_MY_ALL_QUESTION_STATE);
