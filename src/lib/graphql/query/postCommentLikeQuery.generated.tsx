import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditPostCommentLikeMutationVariables = Types.Exact<{
  input: Types.EditPostCommentLikeInput;
}>;


export type EditPostCommentLikeMutation = { __typename?: 'Mutation', editPostCommentLike: { __typename?: 'EditPostCommentLikeOutput', currentState: boolean, error?: string | null, ok: boolean } };


export const EditPostCommentLikeDocument = gql`
    mutation EditPostCommentLike($input: EditPostCommentLikeInput!) {
  editPostCommentLike(input: $input) {
    currentState
    error
    ok
  }
}
    `;

export function useEditPostCommentLikeMutation() {
  return Urql.useMutation<EditPostCommentLikeMutation, EditPostCommentLikeMutationVariables>(EditPostCommentLikeDocument);
};