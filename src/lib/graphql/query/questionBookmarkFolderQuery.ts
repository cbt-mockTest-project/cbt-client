import { gql } from '@apollo/client';

export const READ_QUESTION_BOOKMARK_FOLDERS = gql`
  query ReadQuestionBookmarkFolders {
    readQuestionBookmarkFolders {
      error
      ok
      folders {
        name
        id
        created_at
      }
    }
  }
`;

export const CREATE_QUESTION_BOOKMARK_FOLDER = gql`
  mutation CreateQuestionBookmarkFolder(
    $input: CreateQuestionBookmarkFolderInput!
  ) {
    createQuestionBookmarkFolder(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_QUESTION_BOOKMARK_FOLDER = gql`
  mutation DeleteQuestionBookmarkFolder(
    $input: DeleteQuestionBookmarkFolderInput!
  ) {
    deleteQuestionBookmarkFolder(input: $input) {
      error
      ok
    }
  }
`;

export const UPDATE_QUESTION_BOOKMARK_FOLDER = gql`
  mutation UpdateQuestionBookmarkFolder(
    $input: UpdateQuestionBookmarkFolderInput!
  ) {
    updateQuestionBookmarkFolder(input: $input) {
      error
      ok
    }
  }
`;
