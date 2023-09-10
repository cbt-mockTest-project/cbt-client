import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CheckDiscountCodeMutationVariables = Types.Exact<{
  input: Types.CheckDiscountCodeInput;
}>;


export type CheckDiscountCodeMutation = { __typename?: 'Mutation', checkDiscountCode: { __typename?: 'CheckDiscountCodeOutput', error?: string | null, ok: boolean } };

export type UpdateDiscountCodeMutationVariables = Types.Exact<{
  input: Types.UpdateDiscountCodeInput;
}>;


export type UpdateDiscountCodeMutation = { __typename?: 'Mutation', updateDiscountCode: { __typename?: 'UpdateDiscountCodeOutput', error?: string | null, ok: boolean } };


export const CheckDiscountCodeDocument = gql`
    mutation CheckDiscountCode($input: CheckDiscountCodeInput!) {
  checkDiscountCode(input: $input) {
    error
    ok
  }
}
    `;

export function useCheckDiscountCodeMutation() {
  return Urql.useMutation<CheckDiscountCodeMutation, CheckDiscountCodeMutationVariables>(CheckDiscountCodeDocument);
};
export const UpdateDiscountCodeDocument = gql`
    mutation UpdateDiscountCode($input: UpdateDiscountCodeInput!) {
  updateDiscountCode(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateDiscountCodeMutation() {
  return Urql.useMutation<UpdateDiscountCodeMutation, UpdateDiscountCodeMutationVariables>(UpdateDiscountCodeDocument);
};