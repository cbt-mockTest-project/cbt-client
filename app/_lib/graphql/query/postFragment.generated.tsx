import * as Types from '../../../types';

import gql from 'graphql-tag';
export type PostPartsFragment = { __typename?: 'Post', content: string, created_at: any, id: number, title: string, updated_at: any, commentsCount: number, likesCount: number, likeState: boolean, view: number, category: Types.PostCategory, priority: number, user: { __typename?: 'User', id: number, nickname: string }, like: Array<{ __typename?: 'PostLike', id: number }>, data?: { __typename?: 'PostData', id: number, price: number, postFile: Array<{ __typename?: 'PostFile', page: number, name: string, url: string }> } | null };

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
  like {
    id
  }
  data {
    id
    postFile {
      page
      name
      url
    }
    price
  }
  commentsCount
  likesCount
  likeState
  view
  category
  priority
}
    `;