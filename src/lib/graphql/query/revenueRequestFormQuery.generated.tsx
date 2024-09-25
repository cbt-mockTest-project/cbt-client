import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateRevenueRequestFormMutationVariables = Types.Exact<{
  input: Types.CreateRevenueRequestFormInput;
}>;

export type CreateRevenueRequestFormMutation = {
  __typename?: 'Mutation';
  createRevenueRequestForm: {
    __typename?: 'CreateRevenueRequestFormOutput';
    ok: boolean;
    error?: string | null;
    revenueRequestForm?: {
      __typename?: 'RevenueRequestForm';
      id: number;
      status: Types.RevenueRequestFormStatus;
      reason?: string | null;
    } | null;
  };
};

export type GetRevenueRequestFormsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetRevenueRequestFormsQuery = {
  __typename?: 'Query';
  getRevenueRequestForms: {
    __typename?: 'GetRevenueRequestFormsOutput';
    error?: string | null;
    ok: boolean;
    revenueRequestForms?: Array<{
      __typename?: 'RevenueRequestForm';
      created_at: any;
      id: number;
      reason?: string | null;
      status: Types.RevenueRequestFormStatus;
      category: {
        __typename?: 'MockExamCategory';
        id: number;
        urlSlug: string;
        user: { __typename?: 'User'; email: string; id: number };
      };
    }> | null;
  };
};

export type UpdateRevenueRequestFormMutationVariables = Types.Exact<{
  input: Types.UpdateRevenueRequestFormInput;
}>;

export type UpdateRevenueRequestFormMutation = {
  __typename?: 'Mutation';
  updateRevenueRequestForm: {
    __typename?: 'UpdateRevenueRequestFormOutput';
    error?: string | null;
    ok: boolean;
  };
};

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
  return Urql.useMutation<
    CreateRevenueRequestFormMutation,
    CreateRevenueRequestFormMutationVariables
  >(CreateRevenueRequestFormDocument);
}
export const GetRevenueRequestFormsDocument = gql`
  query GetRevenueRequestForms {
    getRevenueRequestForms {
      error
      ok
      revenueRequestForms {
        category {
          id
          urlSlug
          user {
            email
            id
          }
        }
        created_at
        id
        reason
        status
      }
    }
  }
`;

export function useGetRevenueRequestFormsQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetRevenueRequestFormsQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetRevenueRequestFormsQuery,
    GetRevenueRequestFormsQueryVariables
  >({ query: GetRevenueRequestFormsDocument, ...options });
}
export const UpdateRevenueRequestFormDocument = gql`
  mutation UpdateRevenueRequestForm($input: UpdateRevenueRequestFormInput!) {
    updateRevenueRequestForm(input: $input) {
      error
      ok
    }
  }
`;

export function useUpdateRevenueRequestFormMutation() {
  return Urql.useMutation<
    UpdateRevenueRequestFormMutation,
    UpdateRevenueRequestFormMutationVariables
  >(UpdateRevenueRequestFormDocument);
}
