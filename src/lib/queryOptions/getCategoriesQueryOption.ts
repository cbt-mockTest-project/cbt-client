import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';

export const GetCategoriesQueryKey = {
  main_modu: ['main_moduCategories'],
  main_ehs: ['main_ehsCategories'],
  main_bookmarked: ['main_bookmarkedCategories'],
  main_user: ['main_userCategories'],
  modu_storage: ['storage_moduCategories'],
  ehs_storage: ['storage_ehsCategories'],
  user_storage: ['storage_userCategories'],
};
export const mainKeys = [
  GetCategoriesQueryKey.main_modu,
  GetCategoriesQueryKey.main_ehs,
  GetCategoriesQueryKey.main_bookmarked,
  GetCategoriesQueryKey.main_user,
];

export const storageKeys = [
  GetCategoriesQueryKey.modu_storage,
  GetCategoriesQueryKey.ehs_storage,
  GetCategoriesQueryKey.user_storage,
];

export const sortHomeUserCategories = (
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
    .map((category, index) => ({
      ...category,
      isNew: index === 0,
    }));
  return [
    ...categoriesSortedByCreatedAt.slice(0, 1),
    ...categoriesSortedByLikes.filter((category) => !category['isNew']),
  ];
};

export const sortStorageCategories = (
  categories: MockExamCategory[]
): MockExamCategory[] =>
  [...categories].sort(
    (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
  );

export const getHomeCategories = async (
  input: GetExamCategoriesInput
): Promise<MockExamCategory[]> => {
  const response = await apolloClient.query<GetExamCategoriesQuery>({
    query: GET_EXAM_CATEGORIES,
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
  });
  const categories = response.data.getExamCategories.categories || [];
  if (input.examSource === ExamSource.User) {
    return sortHomeUserCategories(categories as MockExamCategory[]);
  }
  return categories as MockExamCategory[];
};

export const getStorageCategories = async (
  input: GetExamCategoriesInput
): Promise<MockExamCategory[]> => {
  const response = await apolloClient.query<GetExamCategoriesQuery>({
    query: GET_EXAM_CATEGORIES,
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
  });
  const categories = response.data.getExamCategories.categories || [];
  if (input.examSource === ExamSource.User) {
    return sortStorageCategories(categories as MockExamCategory[]);
  }
  return categories as MockExamCategory[];
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
}: GetCategoriesQueryOptionProps) => {
  let queryFn: () => Promise<MockExamCategory[]>;

  if (mainKeys.includes(queryKey)) {
    queryFn = () => getHomeCategories(input);
  }
  if (storageKeys.includes(queryKey)) {
    queryFn = () => getStorageCategories(input);
  }
  return queryOptions({
    queryKey,
    queryFn,
    enabled,
  });
};
