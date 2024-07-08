import { gql } from '@apollo/client';

export const EDIT_POST_COMMENT_LIKE = gql`
  mutation EditPostCommentLike($input: EditPostCommentLikeInput!) {
    editPostCommentLike(input: $input) {
      currentState
      error
      ok
    }
  }
`;
