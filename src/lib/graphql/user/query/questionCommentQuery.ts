import { gql } from '@apollo/client';

export const CREATE_QUESTION_COMMENT = gql`
  mutation CreateMockExamQuestionComment(
    $input: CreateMockExamQuestionCommentInput!
  ) {
    createMockExamQuestionComment(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_QUESTION_COMMENT = gql`
  mutation DeleteMockExamQuestionComment(
    $input: DeleteMockExamQuestionCommentInput!
  ) {
    deleteMockExamQuestionComment(input: $input) {
      error
      ok
    }
  }
`;

export const EDIT_QUESTION_COMMENT = gql`
  mutation EditMockExamQuestionComment(
    $input: EditMockExamQuestionCommentInput!
  ) {
    editMockExamQuestionComment(input: $input) {
      error
      ok
    }
  }
`;

export const READ_QUESTION_COMMENT = gql`
  query ReadMockExamQuestionCommentsByQuestinId(
    $input: ReadMockExamQuestionCommentsByQuestinIdInput!
  ) {
    readMockExamQuestionCommentsByQuestinId(input: $input) {
      comments {
        created_at
        content
        likeState
        id
        user {
          nickname
        }
      }
    }
  }
`;
