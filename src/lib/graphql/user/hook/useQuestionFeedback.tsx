import { useMutation } from '@apollo/client';
import { DELETE_QUESTION_FEEDBACK } from '../query/questionFeedbackQuery';
import {
  DeleteMockExamQuestionFeedbackMutation,
  DeleteMockExamQuestionFeedbackMutationVariables,
} from '../query/questionFeedbackQuery.generated';
import {
  UpdateMockExamQuestionFeedbackRecommendationMutation,
  UpdateMockExamQuestionFeedbackRecommendationMutationVariables,
} from '../query/feedbackQuery.generated';
import { UPDATE_FEEDBACK_RECOMMENDATION } from '../query/feedbackQuery';

export const useDeleteQuestionFeedback = () =>
  useMutation<
    DeleteMockExamQuestionFeedbackMutation,
    DeleteMockExamQuestionFeedbackMutationVariables
  >(DELETE_QUESTION_FEEDBACK);

export const useUpdateQuestionFeedbackRecommendation = () =>
  useMutation<
    UpdateMockExamQuestionFeedbackRecommendationMutation,
    UpdateMockExamQuestionFeedbackRecommendationMutationVariables
  >(UPDATE_FEEDBACK_RECOMMENDATION);
