import { useMutation } from '@apollo/client';
import { TOGGLE_EXAM_CATEGORY_BOOKMARK } from '../query/examCategoryBookmark';
import {
  ToggleExamCategorieBookmarkMutation,
  ToggleExamCategorieBookmarkMutationVariables,
} from '../query/examCategoryBookmark.generated';

export const useToggleExamCategoryBookmark = () =>
  useMutation<
    ToggleExamCategorieBookmarkMutation,
    ToggleExamCategorieBookmarkMutationVariables
  >(TOGGLE_EXAM_CATEGORY_BOOKMARK);
