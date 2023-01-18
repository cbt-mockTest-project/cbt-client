import { FULL_POST_COMMENT_FRAGMENT } from './postCommentFragment';
import { gql } from '@apollo/client';

export const CREATE_POST_COMMENT = gql`
  mutation CreatePostComment($input: CreatePostCommentInput!) {
    createPostComment(input: $input) {
      error
      ok
      comment {
        ...PostCommentParts
      }
    }
  }
  ${FULL_POST_COMMENT_FRAGMENT}
`;

export const DELETE_POST_COMMENT = gql`
  mutation DeletePostComment($input: DeletePostCommentInput!) {
    deletePostComment(input: $input) {
      error
      ok
    }
  }
`;

export const EDIT_POST_COMMENT = gql`
  mutation EditPostComment($input: EditPostCommentInput!) {
    editPostComment(input: $input) {
      error
      ok
    }
  }
`;
