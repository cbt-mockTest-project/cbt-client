import { useMutation } from '@apollo/client';
import {
  CREATE_OR_UPDATE_QUESTION_STATE,
  RESET_QUESTION_STATE_MUTATION,
} from '../query/questionStateQuery';
import {
  CreateOrUpdateMockExamQuestionStateMutation,
  CreateOrUpdateMockExamQuestionStateMutationVariables,
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
