import { GET_MY_SETTLEMENT_REQUESTS } from '@lib/graphql/query/settlementRequestQuery';
import {
  GetMySettlementRequestsQuery,
  GetMySettlementRequestsQueryVariables,
} from '@lib/graphql/query/settlementRequestQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';

const useMySettlementRequests = () => {
  const mySettlementRequestsQueryOptions = queryOptions({
    queryKey: ['mySettlementRequests'],
    queryFn: async () => {
      const { data } = await apolloClient.query<
        GetMySettlementRequestsQuery,
        GetMySettlementRequestsQueryVariables
      >({
        query: GET_MY_SETTLEMENT_REQUESTS,
      });
      return data;
    },
  });

  return { mySettlementRequestsQueryOptions };
};

export default useMySettlementRequests;
