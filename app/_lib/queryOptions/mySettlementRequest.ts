import { GET_MY_SETTLEMENT_REQUEST } from '../graphql/query/settlementRequestQuery';
import {
  GetMySettlementRequestQuery,
  GetMySettlementRequestQueryVariables,
} from '../graphql/query/settlementRequestQuery.generated';
import { apolloClient } from '../../_modules/apollo';
import { queryOptions } from '@tanstack/react-query';

export const mySettlementRequestQueryOptions = queryOptions({
  queryKey: ['mySettlementRequest'],
  queryFn: async () => {
    const { data } = await apolloClient.query<
      GetMySettlementRequestQuery,
      GetMySettlementRequestQueryVariables
    >({
      query: GET_MY_SETTLEMENT_REQUEST,
    });
    return data;
  },
});
