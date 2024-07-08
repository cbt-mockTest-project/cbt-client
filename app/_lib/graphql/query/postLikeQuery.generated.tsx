import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditPostLikeMutationVariables = Types.Exact<{
  input: Types.EditPostLikeInput;
}>;


export type EditPostLikeMutation = { __typename?: 'Mutation', editPostLike: { __typename?: 'EditPostLikeOutput', currentState: boolean, error?: string | null, ok: boolean } };


export const EditPostLikeDocument = gql`
    mutation EditPostLike($input: EditPostLikeInput!) {
  editPostLike(input: $input) {
    currentState
    error
    ok
  }
}
    `;

export function useEditPostLikeMutation() {
  return Urql.useMutation<EditPostLikeMutation, EditPostLikeMutationVariables>(EditPostLikeDocument);
};