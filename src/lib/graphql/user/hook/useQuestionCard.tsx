import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_QUESTION_CARD,
  CREATE_QUESTION_CARD_CATEGORY,
  DELETE_QUESTION_CARD,
  DELETE_QUESTION_CARD_CATEGORY,
  READ_QUESTION_CARDS,
  READ_QUESTION_CARD_CATEGORIES,
  UPDATE_QUESTION_CARD,
  UPDATE_QUESTION_CARD_CATEGORY,
} from '../query/questionCardQuery';
import {
  CreateQuestionCardCategoryMutation,
  CreateQuestionCardCategoryMutationVariables,
  CreateQuestionCardMutation,
  CreateQuestionCardMutationVariables,
  DeleteQuestionCardCategoryMutation,
  DeleteQuestionCardCategoryMutationVariables,
  DeleteQuestionCardsMutation,
  DeleteQuestionCardsMutationVariables,
  ReadMyQuestionCardCategoriesQuery,
  ReadMyQuestionCardCategoriesQueryVariables,
  ReadMyQuestionCardsQuery,
  ReadMyQuestionCardsQueryVariables,
  UpdateQuestionCardCategoryMutation,
  UpdateQuestionCardCategoryMutationVariables,
  UpdateQuestionCardMutation,
  UpdateQuestionCardMutationVariables,
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

export const useReadQuestionCards = () =>
  useQuery<ReadMyQuestionCardsQuery, ReadMyQuestionCardsQueryVariables>(
    READ_QUESTION_CARDS
  );

export const useCreateQuestionCard = () =>
  useMutation<CreateQuestionCardMutation, CreateQuestionCardMutationVariables>(
    CREATE_QUESTION_CARD
  );

export const useUpdateQuestionCard = () =>
  useMutation<UpdateQuestionCardMutation, UpdateQuestionCardMutationVariables>(
    UPDATE_QUESTION_CARD
  );

export const useDeleteQuestionCard = () =>
  useMutation<
    DeleteQuestionCardsMutation,
    DeleteQuestionCardsMutationVariables
  >(DELETE_QUESTION_CARD);
