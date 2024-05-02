import { GET_ITEMS_QUERY } from '@lib/graphql/query/itemQuery';
import {
  GetItemsQuery,
  GetItemsQueryVariables,
} from '@lib/graphql/query/itemQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useStoreItems = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const limit = 10;
  const search = (router.query.s as string) || '';
  const storeItemsQueryOptions = queryOptions({
    queryKey: ['getItems', page, search],
    queryFn: async () => {
      const { data } = await apolloClient.query<
        GetItemsQuery,
        GetItemsQueryVariables
      >({
        query: GET_ITEMS_QUERY,
        variables: {
          input: {
            page,
            limit,
            search,
          },
        },
      });
      return data;
    },
  });
  const { data, isLoading } = useQuery(storeItemsQueryOptions);
  return {
    data,
    page,
    limit,
    search,
    isLoading,
  };
};

export default useStoreItems;
