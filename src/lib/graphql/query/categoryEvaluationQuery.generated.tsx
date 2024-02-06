import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCategoryEvaluationQueryVariables = Types.Exact<{
  input: Types.GetCategoryEvaluationInput;
}>;


export type GetCategoryEvaluationQuery = { __typename?: 'Query', getCategoryEvaluation: { __typename?: 'GetCategoryEvaluationOutput', isEvaluated?: boolean | null, error?: string | null, ok: boolean, categoryEvaluations?: Array<{ __typename?: 'CategoryEvaluation', isSecret?: boolean | null, score?: number | null, feedback?: string | null, id: number, user: { __typename?: 'User', nickname: string, id: number } }> | null } };

export type CreateCategoryEvaluationMutationVariables = Types.Exact<{
  input: Types.CreateCategoryEvaluationInput;
}>;


export type CreateCategoryEvaluationMutation = { __typename?: 'Mutation', createCategoryEvaluation: { __typename?: 'CreateCategoryEvaluationOutput', error?: string | null, ok: boolean, categoryEvaluation?: { __typename?: 'CategoryEvaluation', isSecret?: boolean | null, score?: number | null, feedback?: string | null, id: number, user: { __typename?: 'User', nickname: string, id: number } } | null } };

export type DeleteCategoryEvaluationMutationVariables = Types.Exact<{
  input: Types.DeleteCategoryEvaluationInput;
}>;


export type DeleteCategoryEvaluationMutation = { __typename?: 'Mutation', deleteCategoryEvaluation: { __typename?: 'DeleteCategoryEvaluationOutput', error?: string | null, ok: boolean } };

export type UpdateCategoryEvaluationMutationVariables = Types.Exact<{
  input: Types.UpdateCategoryEvaluationInput;
}>;


export type UpdateCategoryEvaluationMutation = { __typename?: 'Mutation', updateCategoryEvaluation: { __typename?: 'UpdateCategoryEvaluationOutput', error?: string | null, ok: boolean } };

export type CheckIfCategoryEvaluatedMutationVariables = Types.Exact<{
  input: Types.CheckIfCategoryEvaluatedInput;
}>;


export type CheckIfCategoryEvaluatedMutation = { __typename?: 'Mutation', checkIfCategoryEvaluated: { __typename?: 'CheckIfCategoryEvaluatedOutput', error?: string | null, isEvaluated?: boolean | null, ok: boolean } };


export const GetCategoryEvaluationDocument = gql`
    query GetCategoryEvaluation($input: GetCategoryEvaluationInput!) {
  getCategoryEvaluation(input: $input) {
    categoryEvaluations {
      isSecret
      score
      user {
        nickname
        id
      }
      feedback
      id
    }
    isEvaluated
    error
    ok
  }
}
    `;

export function useGetCategoryEvaluationQuery(options: Omit<Urql.UseQueryArgs<GetCategoryEvaluationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCategoryEvaluationQuery, GetCategoryEvaluationQueryVariables>({ query: GetCategoryEvaluationDocument, ...options });
};
export const CreateCategoryEvaluationDocument = gql`
    mutation CreateCategoryEvaluation($input: CreateCategoryEvaluationInput!) {
  createCategoryEvaluation(input: $input) {
    error
    ok
    categoryEvaluation {
      isSecret
      score
      user {
        nickname
        id
      }
      feedback
      id
    }
  }
}
    `;

export function useCreateCategoryEvaluationMutation() {
  return Urql.useMutation<CreateCategoryEvaluationMutation, CreateCategoryEvaluationMutationVariables>(CreateCategoryEvaluationDocument);
};
export const DeleteCategoryEvaluationDocument = gql`
    mutation DeleteCategoryEvaluation($input: DeleteCategoryEvaluationInput!) {
  deleteCategoryEvaluation(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteCategoryEvaluationMutation() {
  return Urql.useMutation<DeleteCategoryEvaluationMutation, DeleteCategoryEvaluationMutationVariables>(DeleteCategoryEvaluationDocument);
};
export const UpdateCategoryEvaluationDocument = gql`
    mutation UpdateCategoryEvaluation($input: UpdateCategoryEvaluationInput!) {
  updateCategoryEvaluation(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateCategoryEvaluationMutation() {
  return Urql.useMutation<UpdateCategoryEvaluationMutation, UpdateCategoryEvaluationMutationVariables>(UpdateCategoryEvaluationDocument);
};
export const CheckIfCategoryEvaluatedDocument = gql`
    mutation CheckIfCategoryEvaluated($input: CheckIfCategoryEvaluatedInput!) {
  checkIfCategoryEvaluated(input: $input) {
    error
    isEvaluated
    ok
  }
}
    `;

export function useCheckIfCategoryEvaluatedMutation() {
  return Urql.useMutation<CheckIfCategoryEvaluatedMutation, CheckIfCategoryEvaluatedMutationVariables>(CheckIfCategoryEvaluatedDocument);
};