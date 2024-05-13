import { GET_CATEGORY_POINT_HISTORIES } from '@lib/graphql/query/categoryPointHistoryQuery';
import {
  GetCategoryPointHistoriesQuery,
  GetCategoryPointHistoriesQueryVariables,
} from '@lib/graphql/query/categoryPointHistoryQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions, useQuery } from '@tanstack/react-query';

const useCategoryPointHistories = (categoryId: number) => {
  const getCategoryPointHistoriesQueryOption = queryOptions({
    queryKey: ['getCategoryPointHistories', categoryId],
    queryFn: async () => {
      if (!categoryId) return;
      const { data } = await apolloClient.query<
        GetCategoryPointHistoriesQuery,
        GetCategoryPointHistoriesQueryVariables
      >({
        query: GET_CATEGORY_POINT_HISTORIES,
        variables: {
          input: {
            categoryId,
          },
        },
      });
      return data;
    },
  });

  const { data, isLoading } = useQuery(getCategoryPointHistoriesQueryOption);
  return {
    pointHistories:
      data?.getCategoryPointHistories.categoryPointHistories || [],
    isLoading,
  };
};

export default useCategoryPointHistories;
