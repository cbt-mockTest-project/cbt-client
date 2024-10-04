import {
  GET_EXAM_CATEGORIES,
  GET_EXAM_CATEGORIES_V2,
} from '@lib/graphql/query/examQuery';
import { GetExamCategoriesV2Query } from '@lib/graphql/query/examQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import {
  ExamSource,
  GetExamCategoriesInput,
  GetExamCategoriesInputV2,
  MockExamCategory,
} from 'types';

export const GetCategoriesQueryKey = {
  objective: ['objectiveCategories'],
  premium: ['premiumCategories'],
  bookmarked: ['bookmarkedCategories'],
  popular: ['popularCategories'],
};

export const getCategories = async (
  input: GetExamCategoriesInput
): Promise<MockExamCategory[]> => {
  const response = await apolloClient.query<GetExamCategoriesV2Query>({
    query: GET_EXAM_CATEGORIES_V2,
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
  });
  const categories = response.data.getExamCategoriesV2.categories || [];
  return categories as MockExamCategory[];
};

export interface GetCategoriesQueryOptionProps {
  queryKey: string[];
  input: GetExamCategoriesInputV2;
  enabled?: boolean;
}

export const getCategoriesQueryOption = ({
  queryKey,
  input,
  enabled,
}: GetCategoriesQueryOptionProps) => {
  return queryOptions({
    queryKey,
    queryFn: () => getCategories(input),
    enabled,
  });
};
