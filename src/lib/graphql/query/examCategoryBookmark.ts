import { gql } from '@apollo/client';

export const TOGGLE_EXAM_CATEGORY_BOOKMARK = gql`
  mutation ToggleExamCategorieBookmark(
    $input: ToggleExamCategoryBookmarkInput!
  ) {
    toggleExamCategorieBookmark(input: $input) {
      error
      isBookmarked
      ok
    }
  }
`;
