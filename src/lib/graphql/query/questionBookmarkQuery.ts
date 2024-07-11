import { gql } from '@apollo/client';
import { PURE_QUESTION_FRAGMENT } from './questionFragment';

/** deprecated */
export const EDIT_QUESTION_BOOKMARK = gql`
  mutation EditMockExamQuestionBookmark(
    $input: EditMockExamQuestionBookmarkInput!
  ) {
    editMockExamQuestionBookmark(input: $input) {
      currentState
      error
      ok
    }
  }
`;

/** deprecated */
export const READ_QUESTION_BOOKMARK = gql`
  query ReadMockExamQuestionBookmark(
    $input: ReadMockExamQuestionBookmarkInput!
  ) {
    readMockExamQuestionBookmark(input: $input) {
      error
      ok
      questions {
        ...PureQuestionParts
      }
    }
  }
  ${PURE_QUESTION_FRAGMENT}
`;

/** deprecated */
export const READ_EXAM_TITLE_AND_ID_OF_BOOKMARKED_QUESTION = gql`
  query ReadExamTitleAndIdOfBookmarkedQuestion {
    readExamTitleAndIdOfBookmarkedQuestion {
      error
      ok
      titleAndId {
        id
        title
      }
    }
  }
`;

/** deprecated */
export const RESET_MY_QUESTION_BOOKMARK = gql`
  mutation ResetMyQuestionBookmark {
    resetMyQuestionBookmark {
      error
      ok
    }
  }
`;

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
