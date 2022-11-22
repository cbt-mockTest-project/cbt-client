import { useQuery } from '@apollo/client';
import { READ_EXAM_CATEGORIES_QUERY } from '../query/examQuery';
import {
  ReadAllMockExamCategoriesQuery,
  ReadAllMockExamCategoriesQueryVariables,
} from '../query/examQuery.generated';

export const useReadExamCategoriesQuery = () =>
  useQuery<
    ReadAllMockExamCategoriesQuery,
    ReadAllMockExamCategoriesQueryVariables
  >(READ_EXAM_CATEGORIES_QUERY);
