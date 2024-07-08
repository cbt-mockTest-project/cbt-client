import { gql } from '@apollo/client';

export const FULL_POST_COMMENT_FRAGMENT = gql`
  fragment PostCommentParts on PostComment {
    created_at
    content
    likeState
    likesCount
    id
    user {
      nickname
      id
    }
  }
`;
