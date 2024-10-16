import { useMeQuery } from '@lib/graphql/hook/useUser';
import { GET_MY_POINT_TRANSACTIONS } from '@lib/graphql/query/pointTransactionQuery';
import {
  GetPointTransactionsQuery,
  GetPointTransactionsQueryVariables,
} from '@lib/graphql/query/pointTransactionQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions, useQuery } from '@tanstack/react-query';

const useMyPointTransactions = () => {
  const { data: meQuery } = useMeQuery();
  const getCategoryPointHistoriesQueryOption = queryOptions({
    queryKey: ['getPointTransactions', meQuery.me?.user.id],
    queryFn: async () => {
      if (!meQuery.me?.ok) return;
      const { data } = await apolloClient.query<
        GetPointTransactionsQuery,
        GetPointTransactionsQueryVariables
      >({
        query: GET_MY_POINT_TRANSACTIONS,
      });
      return data;
    },
  });

  const { data, isLoading } = useQuery(getCategoryPointHistoriesQueryOption);
  return {
    pointHistories: data?.getPointTransactions.pointTransactions || [],
    isLoading,
  };
};

export default useMyPointTransactions;
