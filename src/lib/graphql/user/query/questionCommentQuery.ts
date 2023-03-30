import { MockExamQuestionComment } from './../../../../types';
import { FULL_QUESTION_COMMENT_FRAGMENT } from './questionCommentFragment';
import { gql } from '@apollo/client';

export const CREATE_QUESTION_COMMENT = gql`
  mutation CreateMockExamQuestionComment(
    $input: CreateMockExamQuestionCommentInput!
  ) {
    createMockExamQuestionComment(input: $input) {
      error
      ok
      comment {
        ...QusetionCommentParts
      }
    }
  }
  ${FULL_QUESTION_COMMENT_FRAGMENT}
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
  query ReadMockExamQuestionCommentsByQuestionId(
    $input: ReadMockExamQuestionCommentsByQuestionIdInput!
  ) {
    readMockExamQuestionCommentsByQuestionId(input: $input) {
      comments {
        created_at
        content
        likeState
        likesCount
        id
        user {
          nickname
          id
          role
        }
      }
    }
  }
`;

export const READ_EXAM_TITLE_AND_ID_BY_COMMENT = gql`
  query ReadExamTitleAndIdByQuestionComment {
    readExamTitleAndIdByQuestionComment {
      error
      examTitleAndId {
        id
        title
      }
      ok
    }
  }
`;

export const READ_MY_QUESTION_COMMENTS = gql`
  query ReadMyQuestionComments($input: ReadMyQuestionCommentsInput!) {
    readMyQuestionComments(input: $input) {
      questions {
        id
        question
        number
        mockExam {
          title
        }
        mockExamQuestionComment {
          id
          content
          created_at
        }
      }
      error
      ok
    }
  }
`;
