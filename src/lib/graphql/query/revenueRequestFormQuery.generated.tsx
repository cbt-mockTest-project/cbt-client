import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateRevenueRequestFormMutationVariables = Types.Exact<{
  input: Types.CreateRevenueRequestFormInput;
}>;


export type CreateRevenueRequestFormMutation = { __typename?: 'Mutation', createRevenueRequestForm: { __typename?: 'CreateRevenueRequestFormOutput', ok: boolean, error?: string | null, revenueRequestForm?: { __typename?: 'RevenueRequestForm', id: number, status: Types.RevenueRequestFormStatus, reason?: string | null } | null } };


export const CreateRevenueRequestFormDocument = gql`
    mutation CreateRevenueRequestForm($input: CreateRevenueRequestFormInput!) {
  createRevenueRequestForm(input: $input) {
    ok
    error
    revenueRequestForm {
      id
      status
      reason
    }
  }
}
    `;

export function useCreateRevenueRequestFormMutation() {
  return Urql.useMutation<CreateRevenueRequestFormMutation, CreateRevenueRequestFormMutationVariables>(CreateRevenueRequestFormDocument);
};