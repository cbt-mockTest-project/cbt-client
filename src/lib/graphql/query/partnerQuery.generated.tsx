import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPartnersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPartnersQuery = {
  __typename?: 'Query';
  getPartners: {
    __typename?: 'GetPartnersOutput';
    error?: string | null;
    ok: boolean;
    partners?: Array<{ __typename?: 'Partner'; id: number }> | null;
  };
};

export const GetPartnersDocument = gql`
  query GetPartners {
    getPartners {
      error
      ok
      partners {
        id
      }
    }
  }
`;

export function useGetPartnersQuery(
  options?: Omit<Urql.UseQueryArgs<GetPartnersQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetPartnersQuery, GetPartnersQueryVariables>({
    query: GetPartnersDocument,
    ...options,
  });
}
