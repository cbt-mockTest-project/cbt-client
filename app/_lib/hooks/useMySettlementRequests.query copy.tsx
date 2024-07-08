import { GET_MY_SETTLEMENT_REQUESTS } from '../graphql/query/settlementRequestQuery';
import {
  GetMySettlementRequestsQuery,
  GetMySettlementRequestsQueryVariables,
} from '../graphql/query/settlementRequestQuery.generated';
import { apolloClient } from '../../_modules/apollo';
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
