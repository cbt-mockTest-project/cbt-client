import { handleError } from '@lib/utils/utils';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { initializeApollo } from '@modules/apollo';
import {
  GetKeywordSearchCountQuery,
  GetKeywordSearchCountQueryVariables,
} from '@lib/graphql/query/naverBlogBotQuery.generated';
import { GET_KEYWORD_SEARCH_COUNT } from '@lib/graphql/query/naverBlogBotQuery';

const useNaverKeywordSearch = () => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const keyword = router.query.q as string;
  const options = queryOptions({
    queryKey: ['getKewordSearchCount', keyword],
    queryFn: async () => {
      try {
        if (!keyword) return;
        const { data } = await apolloClient.query<
          GetKeywordSearchCountQuery,
          GetKeywordSearchCountQueryVariables
        >({
          query: GET_KEYWORD_SEARCH_COUNT,
          variables: {
            input: {
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
    data: data?.getKeywordSearchCount.keywordList || [],
    isLoading,
  };
};

export default useNaverKeywordSearch;
