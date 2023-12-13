import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PostCommentUpdatesSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type PostCommentUpdatesSubscription = {
  __typename?: 'Subscription';
  postCommentUpdates: {
    __typename?: 'CoreOutput';
    error?: string | null;
    ok: boolean;
  };
};

export const PostCommentUpdatesDocument = gql`
  subscription PostCommentUpdates {
    postCommentUpdates {
      error
      ok
    }
  }
`;

export function usePostCommentUpdatesSubscription<
  TData = PostCommentUpdatesSubscription
>(
  options: Omit<
    Urql.UseSubscriptionArgs<PostCommentUpdatesSubscriptionVariables>,
    'query'
  > = {},
  handler?: Urql.SubscriptionHandler<PostCommentUpdatesSubscription, TData>
) {
  return Urql.useSubscription<
    PostCommentUpdatesSubscription,
    TData,
    PostCommentUpdatesSubscriptionVariables
  >({ query: PostCommentUpdatesDocument, ...options }, handler);
}
