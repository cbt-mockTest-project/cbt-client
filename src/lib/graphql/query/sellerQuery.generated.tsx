import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBuyersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetBuyersQuery = {
  __typename?: 'Query';
  getBuyers: {
    __typename?: 'GetBuyersOutput';
    ok: boolean;
    error?: string | null;
    userAndRoles?: Array<{
      __typename?: 'UserAndRole';
      id: number;
      price: number;
      created_at: any;
      role: { __typename?: 'Role'; name: string };
      user?: { __typename?: 'User'; nickname: string; email: string } | null;
    }> | null;
  };
};

export const GetBuyersDocument = gql`
  query GetBuyers {
    getBuyers {
      ok
      error
      userAndRoles {
        id
        price
        created_at
        role {
          name
        }
        user {
          nickname
          email
        }
      }
    }
  }
`;

export function useGetBuyersQuery(
  options?: Omit<Urql.UseQueryArgs<GetBuyersQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBuyersQuery, GetBuyersQueryVariables>({
    query: GetBuyersDocument,
    ...options,
  });
}
