import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_QUESTION_CARD_CATEGORY,
  DELETE_QUESTION_CARD_CATEGORY,
  READ_QUESTION_CARD_CATEGORIES,
  UPDATE_QUESTION_CARD_CATEGORY,
} from '../query/questionCardQuery';
import {
  CreateQuestionCardCategoryMutation,
  CreateQuestionCardCategoryMutationVariables,
  DeleteQuestionCardCategoryMutation,
  DeleteQuestionCardCategoryMutationVariables,
  ReadMyQuestionCardCategoriesQuery,
  ReadMyQuestionCardCategoriesQueryVariables,
  UpdateQuestionCardCategoryMutation,
  UpdateQuestionCardCategoryMutationVariables,
} from '../query/questionCardQuery.generated';

export const useReadQuestionCardCategories = () =>
  useQuery<
    ReadMyQuestionCardCategoriesQuery,
    ReadMyQuestionCardCategoriesQueryVariables
  >(READ_QUESTION_CARD_CATEGORIES);

export const useCreateQuestionCardCategory = () =>
  useMutation<
    CreateQuestionCardCategoryMutation,
    CreateQuestionCardCategoryMutationVariables
  >(CREATE_QUESTION_CARD_CATEGORY);

export const useUpdateQuestionCardCategory = () =>
  useMutation<
    UpdateQuestionCardCategoryMutation,
    UpdateQuestionCardCategoryMutationVariables
  >(UPDATE_QUESTION_CARD_CATEGORY);

export const useDeleteQuestionCardCategory = () =>
  useMutation<
    DeleteQuestionCardCategoryMutation,
    DeleteQuestionCardCategoryMutationVariables
  >(DELETE_QUESTION_CARD_CATEGORY);
