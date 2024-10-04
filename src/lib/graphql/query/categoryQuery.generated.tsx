import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchMockExamCategoriesQueryVariables = Types.Exact<{
  input: Types.SearchMockExamCategoriesInput;
}>;


export type SearchMockExamCategoriesQuery = { __typename?: 'Query', searchMockExamCategories: { __typename?: 'SearchMockExamCategoriesOutput', ok: boolean, totalCount?: number | null, categories?: Array<{ __typename?: 'MockExamCategory', urlSlug: string, examType: Types.ExamType, id: number, source: Types.ExamSource, evaluationCount?: number | null, name: string, examCount?: number | null, user: { __typename?: 'User', nickname: string, profileImg: string } }> | null } };


export const SearchMockExamCategoriesDocument = gql`
    query SearchMockExamCategories($input: SearchMockExamCategoriesInput!) {
  searchMockExamCategories(input: $input) {
    ok
    totalCount
    categories {
      user {
        nickname
        profileImg
      }
      urlSlug
      examType
      id
      source
      evaluationCount
      name
      examCount
    }
  }
}
    `;

export function useSearchMockExamCategoriesQuery(options: Omit<Urql.UseQueryArgs<SearchMockExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchMockExamCategoriesQuery, SearchMockExamCategoriesQueryVariables>({ query: SearchMockExamCategoriesDocument, ...options });
};