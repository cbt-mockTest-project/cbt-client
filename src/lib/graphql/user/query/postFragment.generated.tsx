import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type PostPartsFragment = { __typename?: 'Post', content: string, created_at: any, id: number, title: string, updated_at: any, user: { __typename?: 'User', id: number, nickname: string } };

export const PostPartsFragmentDoc = gql`
    fragment PostParts on Post {
  content
  created_at
  id
  title
  updated_at
  user {
    id
    nickname
  }
}
    `;