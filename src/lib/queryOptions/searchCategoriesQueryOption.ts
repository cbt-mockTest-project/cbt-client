import { SEARCH_CATEGORIES_QUERY } from '@lib/graphql/query/categoryQuery';
import {
  SearchMockExamCategoriesQuery,
  SearchMockExamCategoriesQueryVariables,
} from '@lib/graphql/query/categoryQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import { SearchMockExamCategoriesInput } from 'types';

export const searchCategories = async (
  input: SearchMockExamCategoriesInput
) => {
  const response = await apolloClient.query<
    SearchMockExamCategoriesQuery,
    SearchMockExamCategoriesQueryVariables
  >({
    query: SEARCH_CATEGORIES_QUERY,
    variables: {
      input,
    },
  });
  return {
    categories: response.data.searchMockExamCategories.categories,
    totalCount: response.data.searchMockExamCategories.totalCount,
  };
};

export interface SearchCategoriesQueryOptionProps {
  queryKey: string[];
  input: SearchMockExamCategoriesInput;
}

export const searchCategoriesQueryOption = ({
  queryKey,
  input,
}: SearchCategoriesQueryOptionProps) => {
  return queryOptions({
    queryKey,
    queryFn: () => searchCategories(input),
  });
};
