import { gql } from '@apollo/client';

export const FULL_QUESTION_COMMENT_FRAGMENT = gql`
  fragment QusetionCommentParts on MockExamQuestionComment {
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
`;
