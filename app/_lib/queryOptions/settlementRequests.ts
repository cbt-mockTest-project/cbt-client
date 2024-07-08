import { GET_SETTLEMENT_REQUESTS } from '../graphql/query/settlementRequestQuery';
import {
  GetSettlementRequestsQuery,
  GetSettlementRequestsQueryVariables,
} from '../graphql/query/settlementRequestQuery.generated';
import { apolloClient } from '../../_modules/apollo';
import { queryOptions } from '@tanstack/react-query';

export const settlementRequestsQueryOptions = queryOptions({
  queryKey: ['settlementRequests'],
  queryFn: async () => {
    const { data } = await apolloClient.query<
      GetSettlementRequestsQuery,
      GetSettlementRequestsQueryVariables
    >({
      query: GET_SETTLEMENT_REQUESTS,
    });
    return data;
  },
});
