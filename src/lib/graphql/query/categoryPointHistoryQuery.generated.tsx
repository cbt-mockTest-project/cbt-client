import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCategoryPointHistoriesQueryVariables = Types.Exact<{
  input: Types.GetCategoryPointHistoriesInput;
}>;

export type GetCategoryPointHistoriesQuery = {
  __typename?: 'Query';
  getCategoryPointHistories: {
    __typename?: 'GetCategoryPointHistoriesOutput';
    ok: boolean;
    error?: string | null;
    categoryPointHistories?: Array<{
      __typename?: 'CategoryPointHistory';
      created_at: any;
      buyer?: { __typename?: 'User'; nickname: string; email: string } | null;
      pointTransaction: {
        __typename?: 'PointTransaction';
        point: number;
        type: Types.TransactionType;
        description: string;
      };
    }> | null;
  };
};

export const GetCategoryPointHistoriesDocument = gql`
  query GetCategoryPointHistories($input: GetCategoryPointHistoriesInput!) {
    getCategoryPointHistories(input: $input) {
      ok
      error
      categoryPointHistories {
        created_at
        buyer {
          nickname
          email
        }
        pointTransaction {
          point
          type
          description
        }
      }
    }
  }
`;

export function useGetCategoryPointHistoriesQuery(
  options: Omit<
    Urql.UseQueryArgs<GetCategoryPointHistoriesQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetCategoryPointHistoriesQuery,
    GetCategoryPointHistoriesQueryVariables
  >({ query: GetCategoryPointHistoriesDocument, ...options });
}
