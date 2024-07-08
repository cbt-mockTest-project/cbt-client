import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ToggleExamBookmarkMutationVariables = Types.Exact<{
  input: Types.ToggleExamBookmarkInput;
}>;


export type ToggleExamBookmarkMutation = { __typename?: 'Mutation', toggleExamBookmark: { __typename?: 'ToggleExamBookmarkOutput', error?: string | null, ok: boolean, isBookmarked?: boolean | null } };


export const ToggleExamBookmarkDocument = gql`
    mutation ToggleExamBookmark($input: ToggleExamBookmarkInput!) {
  toggleExamBookmark(input: $input) {
    error
    ok
    isBookmarked
  }
}
    `;

export function useToggleExamBookmarkMutation() {
  return Urql.useMutation<ToggleExamBookmarkMutation, ToggleExamBookmarkMutationVariables>(ToggleExamBookmarkDocument);
};