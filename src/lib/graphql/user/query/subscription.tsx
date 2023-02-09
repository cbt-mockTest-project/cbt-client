import { gql } from '@apollo/client';

export const POST_COMMENT_NOTICE = gql`
  subscription PostCommentUpdates {
    postCommentUpdates {
      error
      ok
    }
  }
`;
