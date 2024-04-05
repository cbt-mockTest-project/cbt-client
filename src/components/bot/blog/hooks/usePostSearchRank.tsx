import { handleError } from '@lib/utils/utils';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { initializeApollo } from '@modules/apollo';
import {
  GetSearchRankQuery,
  GetSearchRankQueryVariables,
} from '@lib/graphql/query/naverBlogBotQuery.generated';
import { GET_POST_SEARCH_RANK } from '@lib/graphql/query/naverBlogBotQuery';

const usePostSearchRank = (keyword: string) => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const blogId = router.query.b as string;
  const options = queryOptions({
    queryKey: ['searchRank', blogId, keyword],
    queryFn: async () => {
      try {
        if (!blogId || !keyword) return;
        const { data } = await apolloClient.query<
          GetSearchRankQuery,
          GetSearchRankQueryVariables
        >({
          query: GET_POST_SEARCH_RANK,
          variables: {
            input: {
              blogId,
              keyword,
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
    data: data?.getSearchRank,
    isLoading,
  };
};

export default usePostSearchRank;
