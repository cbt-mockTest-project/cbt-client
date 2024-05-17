import { GET_REVENUE_REQUEST_FORMS_QUERY } from '@lib/graphql/query/revenueRequestFormQuery';
import {
  GetRevenueRequestFormsQuery,
  GetRevenueRequestFormsQueryVariables,
} from '@lib/graphql/query/revenueRequestFormQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';

export const revenueRequestFormsQueryOptions = queryOptions({
  queryKey: ['revenueRequestForms'],
  queryFn: async () => {
    const { data } = await apolloClient.query<
      GetRevenueRequestFormsQuery,
      GetRevenueRequestFormsQueryVariables
    >({
      query: GET_REVENUE_REQUEST_FORMS_QUERY,
    });
    return data;
  },
});
