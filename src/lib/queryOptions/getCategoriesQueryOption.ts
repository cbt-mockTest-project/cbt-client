import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import { GetExamCategoriesInput, MockExamCategory } from 'types';

export const GetCategoriesQueryKey = {
  main_modu: ['main_moduCategories'],
  main_ehs: ['main_ehsCategories'],
  main_bookmarked: ['main_bookmarkedCategories'],
  main_user: ['main_userCategories'],
};

const sortUserCategory = (
  categories: MockExamCategory[]
): MockExamCategory[] => {
  const copiedCategories = cloneDeep(categories);
  const categoriesSortedByLikes = [...copiedCategories].sort(
    (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
  );
  const categoriesSortedByCreatedAt = [...copiedCategories]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .map((category) => ({
      ...category,
      isNew: true,
    }));

  return [
    ...categoriesSortedByCreatedAt.slice(0, 1),
    ...categoriesSortedByLikes.filter((category) => !category['isNew']),
  ];
};

export const getCategories = async (input: GetExamCategoriesInput) => {
  const response = await apolloClient.query<GetExamCategoriesQuery>({
    query: GET_EXAM_CATEGORIES,
    variables: {
      input,
    },
  });
  return response.data.getExamCategories.categories || [];
};

export interface GetCategoriesQueryOptionProps {
  queryKey: string[];
  input: GetExamCategoriesInput;
  enabled?: boolean;
}

export const getCategoriesQueryOption = ({
  queryKey,
  input,
  enabled,
}: GetCategoriesQueryOptionProps) =>
  queryOptions({
    queryKey,
    queryFn: () => getCategories(input),
    enabled,
  });
