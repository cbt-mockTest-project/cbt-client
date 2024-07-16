import {
  GET_EXAM_CATEGORIES,
  GET_EXAM_CATEGORIES_FOR_ADMIN,
} from '@lib/graphql/query/examQuery';
import { GetExamCategoriesForAdminQuery } from '@lib/graphql/query/examQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import { GetExamCategoriesInput, MockExamCategory } from 'types';

export const GET_CATEGORIES_FOR_ADMIN_KEY = ['get-exam-categories-for-admin'];

export const getStorageCategoriesForAdmin = async (): Promise<
  MockExamCategory[]
> => {
  const response = await apolloClient.query<GetExamCategoriesForAdminQuery>({
    query: GET_EXAM_CATEGORIES_FOR_ADMIN,
    fetchPolicy: 'network-only',
  });
  const categories = response.data.getExamCategoriesForAdmin.categories || [];
  return categories as MockExamCategory[];
};

export interface GetCategoriesQueryOptionProps {
  queryKey: string[] | string;
  input: GetExamCategoriesInput;
  enabled?: boolean;
}

export const getCategoriesForAdminQueryOption = queryOptions({
  queryKey: GET_CATEGORIES_FOR_ADMIN_KEY,
  queryFn: getStorageCategoriesForAdmin,
});
