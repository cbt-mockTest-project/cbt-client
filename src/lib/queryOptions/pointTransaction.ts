import { GET_POINT_TRANSACTIONS_FOR_ADMIN } from '@lib/graphql/query/pointTransactionQuery';
import {
  GetPointTransactionsForAdminQuery,
  GetPointTransactionsForAdminQueryVariables,
} from '@lib/graphql/query/pointTransactionQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';

export const getPointTransactionsForAdminQueryOptions = (email: string) =>
  queryOptions({
    queryKey: ['getPointTransactionsForAdmin', email],
    queryFn: async () => {
      if (!email) return;
      const { data } = await apolloClient.query<
        GetPointTransactionsForAdminQuery,
        GetPointTransactionsForAdminQueryVariables
      >({
        query: GET_POINT_TRANSACTIONS_FOR_ADMIN,
        variables: {
          input: {
            email,
          },
        },
      });
      return data;
    },
  });
