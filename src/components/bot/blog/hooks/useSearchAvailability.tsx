import { handleError } from '@lib/utils/utils';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { initializeApollo } from '@modules/apollo';
import {
  GetSearchAvailabilityQuery,
  GetSearchAvailabilityQueryVariables,
} from '@lib/graphql/query/naverBlogBotQuery.generated';
import { GET_SEARCH_AVAILABILITY } from '@lib/graphql/query/naverBlogBotQuery';

const useSearchAvailability = () => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const blogId = router.query.b as string;
  const page = Number(router.query.p) || 1;
  const itemCount = 10;
  const options = queryOptions({
    queryKey: ['searchAvailability', blogId, page],
    queryFn: async () => {
      try {
        if (!blogId) return;
        const { data } = await apolloClient.query<
          GetSearchAvailabilityQuery,
          GetSearchAvailabilityQueryVariables
        >({
          query: GET_SEARCH_AVAILABILITY,
          variables: {
            input: {
              blogId,
              page,
              itemCount,
            },
          },
        });
        return data;
      } catch (e) {
        handleError(e);
      }
    },
  });

  const { data, isLoading } = useQuery(options);

  return {
    data: data?.getSearchAvailability.posts || [],
    isLoading,
  };
};

export default useSearchAvailability;
