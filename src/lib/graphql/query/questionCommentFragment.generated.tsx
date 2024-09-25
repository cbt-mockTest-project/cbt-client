import * as Types from '../../../types';

import gql from 'graphql-tag';
export type QusetionCommentPartsFragment = {
  __typename?: 'MockExamQuestionComment';
  created_at: any;
  content: string;
  likeState: boolean;
  likesCount: number;
  id: number;
  user: {
    __typename?: 'User';
    nickname: string;
    id: number;
    role: Types.UserRole;
  };
};

export const QusetionCommentPartsFragmentDoc = gql`
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
