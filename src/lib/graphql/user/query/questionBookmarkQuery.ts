import { gql } from '@apollo/client';
import { PURE_QUESTION_FRAGMENT } from './questionFragment';

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
