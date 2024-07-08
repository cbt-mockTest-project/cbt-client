import * as Types from '../../../types';

import gql from 'graphql-tag';
export type PostCommentPartsFragment = { __typename?: 'PostComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number } };

export const PostCommentPartsFragmentDoc = gql`
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