import { useMutation } from '@apollo/client';
import { DELETE_QUESTION_FEEDBACK } from '../query/questionFeedbackQuery';
import {
  DeleteMockExamQuestionFeedbackMutation,
  DeleteMockExamQuestionFeedbackMutationVariables,
} from '../query/questionFeedbackQuery.generated';

export const useDeleteQuestionFeedback = () =>
  useMutation<
    DeleteMockExamQuestionFeedbackMutation,
    DeleteMockExamQuestionFeedbackMutationVariables
  >(DELETE_QUESTION_FEEDBACK);
