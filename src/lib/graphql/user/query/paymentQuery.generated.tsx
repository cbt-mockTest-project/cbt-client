import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ChangeClientRoleAndCreatePaymentMutationVariables = Types.Exact<{
  input: Types.ChangeClientRoleAndCreatePaymentInput;
}>;


export type ChangeClientRoleAndCreatePaymentMutation = { __typename?: 'Mutation', changeClientRoleAndCreatePayment: { __typename?: 'ChangeClientRoleAndCreatePaymentOutput', error?: string | null, ok: boolean, paymentId?: number | null } };

export type UpdatePaymentMutationVariables = Types.Exact<{
  input: Types.UpdatePaymentInput;
}>;


export type UpdatePaymentMutation = { __typename?: 'Mutation', updatePayment: { __typename?: 'UpdatePaymentOutput', error?: string | null, ok: boolean } };


export const ChangeClientRoleAndCreatePaymentDocument = gql`
    mutation ChangeClientRoleAndCreatePayment($input: ChangeClientRoleAndCreatePaymentInput!) {
  changeClientRoleAndCreatePayment(input: $input) {
    error
    ok
    paymentId
  }
}
    `;

export function useChangeClientRoleAndCreatePaymentMutation() {
  return Urql.useMutation<ChangeClientRoleAndCreatePaymentMutation, ChangeClientRoleAndCreatePaymentMutationVariables>(ChangeClientRoleAndCreatePaymentDocument);
};
export const UpdatePaymentDocument = gql`
    mutation UpdatePayment($input: UpdatePaymentInput!) {
  updatePayment(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdatePaymentMutation() {
  return Urql.useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UpdatePaymentDocument);
};