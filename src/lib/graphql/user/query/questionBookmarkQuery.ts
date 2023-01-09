import { gql } from '@apollo/client';
import { FULL_QUESTION_FRAGMENT } from './questionFragment';

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
        ...FullQuestionParts
      }
    }
  }
  ${FULL_QUESTION_FRAGMENT}
`;
