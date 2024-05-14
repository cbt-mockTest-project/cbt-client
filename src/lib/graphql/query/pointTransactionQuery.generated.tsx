import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPointTransactionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPointTransactionsQuery = { __typename?: 'Query', getPointTransactions: { __typename?: 'GetPointTransactionsOutput', error?: string | null, ok: boolean, pointTransactions?: Array<{ __typename?: 'PointTransaction', id: number, point: number, type: Types.TransactionType, description: string, created_at: any }> | null } };


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