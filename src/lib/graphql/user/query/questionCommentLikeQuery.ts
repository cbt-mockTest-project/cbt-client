import { gql } from '@apollo/client';

export const EDIT_QUESTION_COMMENT_LIKE = gql`
  mutation EditMockExamQuestionCommentLike(
    $input: EditMockExamQuestionCommentLikeInput!
  ) {
    editMockExamQuestionCommentLike(input: $input) {
      error
      ok
    }
  }
`;

export const READ_QUESTION_COMMENT_LIKE_COUNT = gql`
  query ReadMockExamQuestionCommentLikesByQuestinId(
    $input: ReadMockExamQuestionCommentLikesByQuestinIdInput!
  ) {
    readMockExamQuestionCommentLikesByQuestinId(input: $input) {
      count
      error
      ok
    }
  }
`;
