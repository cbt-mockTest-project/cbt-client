import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPointTransactionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPointTransactionsQuery = { __typename?: 'Query', getPointTransactions: { __typename?: 'GetPointTransactionsOutput', error?: string | null, ok: boolean, pointTransactions?: Array<{ __typename?: 'PointTransaction', id: number, point: number, type: Types.TransactionType, description: string, created_at: any }> | null } };

export type GetPointTransactionsForAdminQueryVariables = Types.Exact<{
  input: Types.GetPointTransactionsForAdminInput;
}>;


export type GetPointTransactionsForAdminQuery = { __typename?: 'Query', getPointTransactionsForAdmin: { __typename?: 'GetPointTransactionsForAdminOutput', error?: string | null, ok: boolean, pointTransactions?: Array<{ __typename?: 'PointTransaction', id: number, point: number, type: Types.TransactionType, description: string, created_at: any }> | null } };

export type CreatePointTransactionForAdminMutationVariables = Types.Exact<{
  input: Types.CreatePointTransactionForAdminInput;
}>;


export type CreatePointTransactionForAdminMutation = { __typename?: 'Mutation', createPointTransactionForAdmin: { __typename?: 'CreatePointTransactionForAdminOutput', error?: string | null, ok: boolean, pointTransaction?: { __typename?: 'PointTransaction', id: number, point: number, type: Types.TransactionType, description: string } | null } };


export const GetPointTransactionsDocument = gql`
    query GetPointTransactions {
  getPointTransactions {
    error
    ok
    pointTransactions {
      id
      point
      type
      description
      created_at
    }
  }
}
    `;

export function useGetPointTransactionsQuery(options?: Omit<Urql.UseQueryArgs<GetPointTransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPointTransactionsQuery, GetPointTransactionsQueryVariables>({ query: GetPointTransactionsDocument, ...options });
};
export const GetPointTransactionsForAdminDocument = gql`
    query GetPointTransactionsForAdmin($input: GetPointTransactionsForAdminInput!) {
  getPointTransactionsForAdmin(input: $input) {
    error
    ok
    pointTransactions {
      id
      point
      type
      description
      created_at
    }
  }
}
    `;

export function useGetPointTransactionsForAdminQuery(options: Omit<Urql.UseQueryArgs<GetPointTransactionsForAdminQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPointTransactionsForAdminQuery, GetPointTransactionsForAdminQueryVariables>({ query: GetPointTransactionsForAdminDocument, ...options });
};
export const CreatePointTransactionForAdminDocument = gql`
    mutation CreatePointTransactionForAdmin($input: CreatePointTransactionForAdminInput!) {
  createPointTransactionForAdmin(input: $input) {
    error
    ok
    pointTransaction {
      id
      point
      type
      description
    }
  }
}
    `;

export function useCreatePointTransactionForAdminMutation() {
  return Urql.useMutation<CreatePointTransactionForAdminMutation, CreatePointTransactionForAdminMutationVariables>(CreatePointTransactionForAdminDocument);
};