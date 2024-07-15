import { gql } from '@apollo/client';

export const MOVE_QUESTION_BOOKMARK = gql`
  mutation MoveQuestionBookmark($input: MoveQuestionBookmarkInput!) {
    moveQuestionBookmark(input: $input) {
      error
      ok
    }
  }
`;

export const CREATE_QUESTION_BOOKMARK = gql`
  mutation CreateQuestionBookmark($input: CreateQuestionBookmarkInput!) {
    createQuestionBookmark(input: $input) {
      error
      ok
      myBookmark {
        id
        bookmarkFolder {
          id
        }
      }
    }
  }
`;

export const DELETE_QUESTION_BOOKMARK = gql`
  mutation DeleteQuestionBookmark($input: DeleteQuestionBookmarkInput!) {
    deleteQuestionBookmark(input: $input) {
      error
      ok
    }
  }
`;

export const RESET_QUESTION_BOOKMARK = gql`
  mutation ResetQuestionBookmark($input: ResetQuestionBookmarkInput!) {
    resetQuestionBookmark(input: $input) {
      error
      ok
    }
  }
`;
