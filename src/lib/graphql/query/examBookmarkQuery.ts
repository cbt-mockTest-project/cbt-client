import { gql } from '@apollo/client';

export const TOGGLE_EXAM_BOOKMARK = gql`
  mutation ToggleExamBookmark($input: ToggleExamBookmarkInput!) {
    toggleExamBookmark(input: $input) {
      error
      ok
      isBookmarked
    }
  }
`;
