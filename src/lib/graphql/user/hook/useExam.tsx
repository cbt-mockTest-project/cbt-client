import { useLazyQuery, useQuery } from '@apollo/client';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '../query/examQuery';
import {
  ReadAllMockExamCategoriesQuery,
  ReadAllMockExamCategoriesQueryVariables,
  ReadMockExamTitlesByCateoryQuery,
  ReadMockExamTitlesByCateoryQueryVariables,
} from '../query/examQuery.generated';

export const useReadExamCategories = () =>
  useQuery<
    ReadAllMockExamCategoriesQuery,
    ReadAllMockExamCategoriesQueryVariables
  >(READ_EXAM_CATEGORIES_QUERY);

export const useReadExamTitles = () =>
  useLazyQuery<
    ReadMockExamTitlesByCateoryQuery,
    ReadMockExamTitlesByCateoryQueryVariables
  >(READ_EXAM_TITLES_QUERY);
