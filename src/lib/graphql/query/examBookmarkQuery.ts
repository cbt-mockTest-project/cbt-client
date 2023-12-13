import { gql } from '@apollo/client';

export const GET_MY_BOOKMARKED_EXAMS = gql`
  query GetMyBookmarkedExams {
    getMyBookmarkedExams {
      error
      ok
      exams {
        id
        slug
        title
        user {
          id
          nickname
        }
      }
    }
  }
`;

export const TOGGLE_EXAM_BOOKMARK = gql`
  mutation ToggleExamBookmark($input: ToggleExamBookmarkInput!) {
    toggleExamBookmark(input: $input) {
      error
      ok
      isBookmarked
    }
  }
`;
