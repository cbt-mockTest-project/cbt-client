import { useMutation } from '@apollo/client';
import {
  CREATE_FEEDBACK,
  CREATE_QUESTION_FEEDBACK,
} from '../query/feedbackQuery';
import {
  CreateFeedbackMutation,
  CreateFeedbackMutationVariables,
  CreateMockExamQuestionFeedbackMutation,
  CreateMockExamQuestionFeedbackMutationVariables,
} from '../query/feedbackQuery.generated';

export const useCreateQuestionFeedBack = () =>
  useMutation<
    CreateMockExamQuestionFeedbackMutation,
    CreateMockExamQuestionFeedbackMutationVariables
  >(CREATE_QUESTION_FEEDBACK);

export const useCreateFeedback = () =>
  useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(
    CREATE_FEEDBACK
  );
