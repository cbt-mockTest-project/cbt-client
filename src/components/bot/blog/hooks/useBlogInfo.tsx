import { handleError } from '@lib/utils/utils';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { initializeApollo } from '@modules/apollo';
import {
  GetBlogInfoQuery,
  GetBlogInfoQueryVariables,
} from '@lib/graphql/query/naverBlogBotQuery.generated';
import { GET_BLOG_INFO } from '@lib/graphql/query/naverBlogBotQuery';

const useBlogInfo = () => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const blogId = router.query.b as string;
  const options = queryOptions({
    queryKey: ['getBlogInfo', blogId],
    queryFn: async () => {
      try {
        if (!blogId) return;
        const { data } = await apolloClient.query<
          GetBlogInfoQuery,
          GetBlogInfoQueryVariables
        >({
          query: GET_BLOG_INFO,
          variables: {
            input: {
              blogId,
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
    data: data?.getBlogInfo,
    isLoading,
  };
};

export default useBlogInfo;
