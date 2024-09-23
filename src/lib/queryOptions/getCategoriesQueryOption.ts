import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';

export const GetCategoriesQueryKey = {
  premium: ['premiumCategories'],
  bookmarked: ['bookmarkedCategories'],
  popular: ['popularCategories'],
};

export const getCategories = async (
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
  return queryOptions({
    queryKey,
    queryFn: () => getCategories(input),
    enabled,
  });
};
