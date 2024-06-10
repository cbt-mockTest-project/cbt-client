import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ToggleExamCategorieBookmarkMutationVariables = Types.Exact<{
  input: Types.ToggleExamCategoryBookmarkInput;
}>;


export type ToggleExamCategorieBookmarkMutation = { __typename?: 'Mutation', toggleExamCategorieBookmark: { __typename?: 'ToggleExamCategoryBookmarkOutput', error?: string | null, isBookmarked?: boolean | null, ok: boolean } };

export type GetExamCategorySubscribersQueryVariables = Types.Exact<{
  input: Types.GetExamCategorySubscribersInput;
}>;


export type GetExamCategorySubscribersQuery = { __typename?: 'Query', getExamCategorySubscribers: { __typename?: 'GetExamCategorySubscribersOutput', error?: string | null, ok: boolean, users?: Array<{ __typename?: 'User', email: string, nickname: string, id: number }> | null } };

export type DeleteExamCategoryBookmarkMutationVariables = Types.Exact<{
  input: Types.DeleteExamCategoryBookmarkInput;
}>;


export type DeleteExamCategoryBookmarkMutation = { __typename?: 'Mutation', deleteExamCategoryBookmark: { __typename?: 'DeleteExamCategoryBookmarkOutput', error?: string | null, ok: boolean } };

export type CheckIsAccessibleCategoryMutationVariables = Types.Exact<{
  input: Types.CheckIsAccessibleCategoryInput;
}>;


export type CheckIsAccessibleCategoryMutation = { __typename?: 'Mutation', checkIsAccessibleCategory: { __typename?: 'CheckIsAccessibleCategoryOutput', error?: string | null, ok: boolean } };

export type CheckHasCategoryAccessMutationVariables = Types.Exact<{
  input: Types.CheckHasCategoryAccessInput;
}>;


export type CheckHasCategoryAccessMutation = { __typename?: 'Mutation', checkHasCategoryAccess: { __typename?: 'CheckHasCategoryAccessOutput', error?: string | null, ok: boolean } };


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
export const GetExamCategorySubscribersDocument = gql`
    query GetExamCategorySubscribers($input: GetExamCategorySubscribersInput!) {
  getExamCategorySubscribers(input: $input) {
    error
    ok
    users {
      email
      nickname
      id
    }
  }
}
    `;

export function useGetExamCategorySubscribersQuery(options: Omit<Urql.UseQueryArgs<GetExamCategorySubscribersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamCategorySubscribersQuery, GetExamCategorySubscribersQueryVariables>({ query: GetExamCategorySubscribersDocument, ...options });
};
export const DeleteExamCategoryBookmarkDocument = gql`
    mutation DeleteExamCategoryBookmark($input: DeleteExamCategoryBookmarkInput!) {
  deleteExamCategoryBookmark(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteExamCategoryBookmarkMutation() {
  return Urql.useMutation<DeleteExamCategoryBookmarkMutation, DeleteExamCategoryBookmarkMutationVariables>(DeleteExamCategoryBookmarkDocument);
};
export const CheckIsAccessibleCategoryDocument = gql`
    mutation CheckIsAccessibleCategory($input: CheckIsAccessibleCategoryInput!) {
  checkIsAccessibleCategory(input: $input) {
    error
    ok
  }
}
    `;

export function useCheckIsAccessibleCategoryMutation() {
  return Urql.useMutation<CheckIsAccessibleCategoryMutation, CheckIsAccessibleCategoryMutationVariables>(CheckIsAccessibleCategoryDocument);
};
export const CheckHasCategoryAccessDocument = gql`
    mutation CheckHasCategoryAccess($input: CheckHasCategoryAccessInput!) {
  checkHasCategoryAccess(input: $input) {
    error
    ok
  }
}
    `;

export function useCheckHasCategoryAccessMutation() {
  return Urql.useMutation<CheckHasCategoryAccessMutation, CheckHasCategoryAccessMutationVariables>(CheckHasCategoryAccessDocument);
};