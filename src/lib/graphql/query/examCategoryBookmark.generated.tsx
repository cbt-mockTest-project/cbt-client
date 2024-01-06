import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ToggleExamCategorieBookmarkMutationVariables = Types.Exact<{
  input: Types.ToggleExamCategoryBookmarkInput;
}>;


export type ToggleExamCategorieBookmarkMutation = { __typename?: 'Mutation', toggleExamCategorieBookmark: { __typename?: 'ToggleExamCategoryBookmarkOutput', error?: string | null, isBookmarked?: boolean | null, ok: boolean } };


export const ToggleExamCategorieBookmarkDocument = gql`
    mutation ToggleExamCategorieBookmark($input: ToggleExamCategoryBookmarkInput!) {
  toggleExamCategorieBookmark(input: $input) {
    error
    isBookmarked
    ok
  }
}
    `;

export function useToggleExamCategorieBookmarkMutation() {
  return Urql.useMutation<ToggleExamCategorieBookmarkMutation, ToggleExamCategorieBookmarkMutationVariables>(ToggleExamCategorieBookmarkDocument);
};