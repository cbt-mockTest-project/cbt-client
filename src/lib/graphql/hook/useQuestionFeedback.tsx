import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  DELETE_QUESTION_FEEDBACK,
  GET_EXAM_TITLE_WITH_FEEDBACK,
  GET_FEEDBACKS_WITH_FILTER,
} from '../query/questionFeedbackQuery';
import {
  DeleteMockExamQuestionFeedbackMutation,
  DeleteMockExamQuestionFeedbackMutationVariables,
  GetExamTitleWithFeedbackQuery,
  GetExamTitleWithFeedbackQueryVariables,
  GetFeedbacksWithFilterQuery,
  GetFeedbacksWithFilterQueryVariables,
} from '../query/questionFeedbackQuery.generated';
import {
  EditMockExamQuestionFeedbackMutation,
  EditMockExamQuestionFeedbackMutationVariables,
  GetFeedbacksByRecommendationCountQuery,
  GetFeedbacksByRecommendationCountQueryVariables,
  UpdateMockExamQuestionFeedbackRecommendationMutation,
  UpdateMockExamQuestionFeedbackRecommendationMutationVariables,
} from '../query/feedbackQuery.generated';
import {
  UPDATE_FEEDBACK_RECOMMENDATION,
  READ_FEEDBACK_BY_RECOMMENDATION_COUNT,
  EDIT_QUESTION_FEEDBACK,
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

export const useGetExamTitleWithFeedback = () =>
  useQuery<
    GetExamTitleWithFeedbackQuery,
    GetExamTitleWithFeedbackQueryVariables
  >(GET_EXAM_TITLE_WITH_FEEDBACK);

export const useLazyGetFeedbacksWithFilter = () =>
  useLazyQuery<
    GetFeedbacksWithFilterQuery,
    GetFeedbacksWithFilterQueryVariables
  >(GET_FEEDBACKS_WITH_FILTER);

export const useEditQuestionFeedback = () =>
  useMutation<
    EditMockExamQuestionFeedbackMutation,
    EditMockExamQuestionFeedbackMutationVariables
  >(EDIT_QUESTION_FEEDBACK);
