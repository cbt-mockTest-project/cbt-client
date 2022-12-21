import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadAllMockExamCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllMockExamCategoriesQuery = { __typename?: 'Query', readAllMockExamCategories: { __typename?: 'ReadAllMockExamCategoriesOutput', error?: string | null, ok: boolean, categories: Array<{ __typename?: 'MockExamCategory', name: string, id: number }> } };

export type ReadMockExamTitlesByCateoryQueryVariables = Types.Exact<{
  input: Types.ReadMockExamTitlesByCateoryInput;
}>;


export type ReadMockExamTitlesByCateoryQuery = { __typename?: 'Query', readMockExamTitlesByCateory: { __typename?: 'ReadMockExamTitlesByCateoryOutput', ok: boolean, error?: string | null, titles: Array<{ __typename?: 'ExamTitleAndId', id: number, title: string }> } };

export type FindMyExamHistoryQueryVariables = Types.Exact<{
  input: Types.FindMyExamHistoryInput;
}>;


export type FindMyExamHistoryQuery = { __typename?: 'Query', findMyExamHistory: { __typename?: 'FindMyExamHistoryOutput', error?: string | null, ok: boolean, titleAndId?: Array<{ __typename?: 'TitleAndId', id?: number | null, title?: string | null }> | null } };


export const ReadAllMockExamCategoriesDocument = gql`
    query ReadAllMockExamCategories {
  readAllMockExamCategories {
    categories {
      name
      id
    }
    error
    ok
  }
}
    `;

export function useReadAllMockExamCategoriesQuery(options?: Omit<Urql.UseQueryArgs<ReadAllMockExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMockExamCategoriesQuery, ReadAllMockExamCategoriesQueryVariables>({ query: ReadAllMockExamCategoriesDocument, ...options });
};
export const ReadMockExamTitlesByCateoryDocument = gql`
    query ReadMockExamTitlesByCateory($input: ReadMockExamTitlesByCateoryInput!) {
  readMockExamTitlesByCateory(input: $input) {
    titles {
      id
      title
    }
    ok
    error
  }
}
    `;

export function useReadMockExamTitlesByCateoryQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamTitlesByCateoryQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamTitlesByCateoryQuery, ReadMockExamTitlesByCateoryQueryVariables>({ query: ReadMockExamTitlesByCateoryDocument, ...options });
};
export const FindMyExamHistoryDocument = gql`
    query FindMyExamHistory($input: FindMyExamHistoryInput!) {
  findMyExamHistory(input: $input) {
    error
    ok
    titleAndId {
      id
      title
    }
  }
}
    `;

export function useFindMyExamHistoryQuery(options: Omit<Urql.UseQueryArgs<FindMyExamHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindMyExamHistoryQuery, FindMyExamHistoryQueryVariables>({ query: FindMyExamHistoryDocument, ...options });
};