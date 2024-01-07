import { useLazyQuery, useMutation } from '@apollo/client';
import {
  DELETE_EXAM_CATEGORY_BOOKMARK,
  GET_EXAM_CATEROGY_SUBSCRIBERS,
  TOGGLE_EXAM_CATEGORY_BOOKMARK,
} from '../query/examCategoryBookmark';
import {
  DeleteExamCategoryBookmarkMutation,
  DeleteExamCategoryBookmarkMutationVariables,
  GetExamCategorySubscribersQuery,
  GetExamCategorySubscribersQueryVariables,
  ToggleExamCategorieBookmarkMutation,
  ToggleExamCategorieBookmarkMutationVariables,
} from '../query/examCategoryBookmark.generated';

export const useToggleExamCategoryBookmark = () =>
  useMutation<
    ToggleExamCategorieBookmarkMutation,
    ToggleExamCategorieBookmarkMutationVariables
  >(TOGGLE_EXAM_CATEGORY_BOOKMARK);

export const useLazyGetCategorySubscribers = () =>
  useLazyQuery<
    GetExamCategorySubscribersQuery,
    GetExamCategorySubscribersQueryVariables
  >(GET_EXAM_CATEROGY_SUBSCRIBERS);

export const useDeleteExamCategoryBookmark = () =>
  useMutation<
    DeleteExamCategoryBookmarkMutation,
    DeleteExamCategoryBookmarkMutationVariables
  >(DELETE_EXAM_CATEGORY_BOOKMARK);
