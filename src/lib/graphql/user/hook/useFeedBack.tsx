import { useMutation } from '@apollo/client';
import { CREATE_FEEDBACK } from '../query/feedbackQuery';
import {
  CreateMockExamQuestionFeedbackMutation,
  CreateMockExamQuestionFeedbackMutationVariables,
} from '../query/feedbackQuery.generated';

export const useCreateFeedBack = () =>
  useMutation<
    CreateMockExamQuestionFeedbackMutation,
    CreateMockExamQuestionFeedbackMutationVariables
  >(CREATE_FEEDBACK);
