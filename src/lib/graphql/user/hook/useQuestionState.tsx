import { useMutation } from '@apollo/client';
import { CREATE_OR_UPDATE_QUESTION_STATE } from '../query/questionStateQuery';
import {
  CreateOrUpdateMockExamQuestionStateMutation,
  CreateOrUpdateMockExamQuestionStateMutationVariables,
} from '../query/questionStateQuery.generated';

export const useChangeQuestionState = () =>
  useMutation<
    CreateOrUpdateMockExamQuestionStateMutation,
    CreateOrUpdateMockExamQuestionStateMutationVariables
  >(CREATE_OR_UPDATE_QUESTION_STATE);
