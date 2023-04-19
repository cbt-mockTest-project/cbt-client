import { useMutation, useQuery } from '@apollo/client';
import { DELETE_QUESTION_FEEDBACK } from '../query/questionFeedbackQuery';
import {
  DeleteMockExamQuestionFeedbackMutation,
  DeleteMockExamQuestionFeedbackMutationVariables,
} from '../query/questionFeedbackQuery.generated';
import {
  GetFeedbacksByRecommendationCountQuery,
  GetFeedbacksByRecommendationCountQueryVariables,
  UpdateMockExamQuestionFeedbackRecommendationMutation,
  UpdateMockExamQuestionFeedbackRecommendationMutationVariables,
} from '../query/feedbackQuery.generated';
import {
  UPDATE_FEEDBACK_RECOMMENDATION,
  READ_FEEDBACK_BY_RECOMMENDATION_COUNT,
} from '../query/feedbackQuery';

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

export const useReadQuestionFeedbackByRecommendationCount = () =>
  useQuery<
    GetFeedbacksByRecommendationCountQuery,
    GetFeedbacksByRecommendationCountQueryVariables
  >(READ_FEEDBACK_BY_RECOMMENDATION_COUNT, {
    variables: {
      input: { count: 5 },
    },
  });
