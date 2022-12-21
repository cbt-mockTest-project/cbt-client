import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FIND_MY_EXAM_HISTORY_QUERY,
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '../query/examQuery';
import {
  FindMyExamHistoryQuery,
  FindMyExamHistoryQueryVariables,
  ReadAllMockExamCategoriesQuery,
  ReadAllMockExamCategoriesQueryVariables,
  ReadMockExamTitlesByCateoryQuery,
  ReadMockExamTitlesByCateoryQueryVariables,
} from '../query/examQuery.generated';

export const useReadExamCategories = () =>
  useQuery<
    ReadAllMockExamCategoriesQuery,
    ReadAllMockExamCategoriesQueryVariables
  >(READ_EXAM_CATEGORIES_QUERY, { fetchPolicy: 'cache-only' });

export const useReadExamTitles = () =>
  useLazyQuery<
    ReadMockExamTitlesByCateoryQuery,
    ReadMockExamTitlesByCateoryQueryVariables
  >(READ_EXAM_TITLES_QUERY);

export const useLazyFindMyExamHistory = () =>
  useLazyQuery<FindMyExamHistoryQuery, FindMyExamHistoryQueryVariables>(
    FIND_MY_EXAM_HISTORY_QUERY
  );
