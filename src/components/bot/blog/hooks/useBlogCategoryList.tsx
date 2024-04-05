import { handleError } from '@lib/utils/utils';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { initializeApollo } from '@modules/apollo';
import {
  GetBlogCategoryListQuery,
  GetBlogCategoryListQueryVariables,
} from '@lib/graphql/query/naverBlogBotQuery.generated';
import { GET_BLOG_CATEGORY_LIST } from '@lib/graphql/query/naverBlogBotQuery';

const useBlogCategoryList = () => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const blogId = router.query.b as string;
  const options = queryOptions({
    queryKey: ['getBlogCategoryList', blogId],
    queryFn: async () => {
      try {
        if (!blogId) return;
        const { data } = await apolloClient.query<
          GetBlogCategoryListQuery,
          GetBlogCategoryListQueryVariables
        >({
          query: GET_BLOG_CATEGORY_LIST,
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
    data: data?.getBlogCategoryList,
    isLoading,
  };
};

export default useBlogCategoryList;
