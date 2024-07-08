import { READ_EXAM_CATEGORY_BY_ID } from '../graphql/query/examQuery';
import { ReadMockExamCategoryByCategoryIdQuery } from '../graphql/query/examQuery.generated';
import { apolloClient } from '../../_modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import {
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdInput,
} from '../../types';

export const getCategoryKey = (urlSlug: string) => ['getCategory', urlSlug];

export const getCategoy = async (
  input: ReadMockExamCategoryByCategoryIdInput
): Promise<MockExamCategory> => {
  const response =
    await apolloClient.query<ReadMockExamCategoryByCategoryIdQuery>({
      query: READ_EXAM_CATEGORY_BY_ID,
      variables: {
        input,
      },
      fetchPolicy: 'network-only',
    });
  const category = response.data?.readMockExamCategoryByCategoryId.category;
  return category as MockExamCategory;
};

export interface GetCategoryQueryOptionProps {
  queryKey: string[];
  input: ReadMockExamCategoryByCategoryIdInput;
  enabled?: boolean;
}

export const getCategoryQueryOption = ({
  queryKey,
  input,
  enabled = true,
}: GetCategoryQueryOptionProps) =>
  queryOptions({ queryKey, queryFn: () => getCategoy(input), enabled });
