import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadAllMockExamCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllMockExamCategoriesQuery = { __typename?: 'Query', readAllMockExamCategories: { __typename?: 'ReadAllMockExamCategoriesOutput', error?: string | null, ok: boolean, categories: Array<{ __typename?: 'MockExamCategory', name: string, id: number }> } };

export type ReadMyMockExamCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadMyMockExamCategoriesQuery = { __typename?: 'Query', readMyMockExamCategories: { __typename?: 'ReadMyMockExamCategoriesOutput', error?: string | null, ok: boolean, categories: Array<{ __typename?: 'MockExamCategory', name: string, id: number }> } };

export type CreateMockExamMutationVariables = Types.Exact<{
  input: Types.CreateMockExamInput;
}>;


export type CreateMockExamMutation = { __typename?: 'Mutation', createMockExam: { __typename?: 'CreateMockExamOutput', error?: string | null, ok: boolean, mockExam?: { __typename?: 'MockExam', id: number, title: string } | null } };

export type CreateMockExamCategoryMutationVariables = Types.Exact<{
  input: Types.CreateMockExamCategoryInput;
}>;


export type CreateMockExamCategoryMutation = { __typename?: 'Mutation', createMockExamCategory: { __typename?: 'CreateMockExamCategoryOutput', error?: string | null, ok: boolean, category?: { __typename?: 'MockExamCategory', id: number, name: string } | null } };

export type ReadMockExamTitlesByCateoryQueryVariables = Types.Exact<{
  input: Types.ReadMockExamTitlesByCateoryInput;
}>;


export type ReadMockExamTitlesByCateoryQuery = { __typename?: 'Query', readMockExamTitlesByCateory: { __typename?: 'ReadMockExamTitlesByCateoryOutput', ok: boolean, error?: string | null, titles: Array<{ __typename?: 'ExamTitleAndId', id: number, title: string }> } };

export type FindMyExamHistoryQueryVariables = Types.Exact<{
  input: Types.FindMyExamHistoryInput;
}>;


export type FindMyExamHistoryQuery = { __typename?: 'Query', findMyExamHistory: { __typename?: 'FindMyExamHistoryOutput', error?: string | null, ok: boolean, titleAndId?: Array<{ __typename?: 'TitleAndId', id?: number | null, title?: string | null }> | null } };

export type ReadAllMockExamQueryVariables = Types.Exact<{
  input: Types.ReadAllMockExamsInput;
}>;


export type ReadAllMockExamQuery = { __typename?: 'Query', readAllMockExam: { __typename?: 'ReadAllMockExamsOutput', error?: string | null, ok: boolean, mockExams: Array<{ __typename?: 'MockExam', id: number }> } };


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
export const ReadMyMockExamCategoriesDocument = gql`
    query ReadMyMockExamCategories {
  readMyMockExamCategories {
    categories {
      name
      id
    }
    error
    ok
  }
}
    `;

export function useReadMyMockExamCategoriesQuery(options?: Omit<Urql.UseQueryArgs<ReadMyMockExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMyMockExamCategoriesQuery, ReadMyMockExamCategoriesQueryVariables>({ query: ReadMyMockExamCategoriesDocument, ...options });
};
export const CreateMockExamDocument = gql`
    mutation CreateMockExam($input: CreateMockExamInput!) {
  createMockExam(input: $input) {
    error
    mockExam {
      id
      title
    }
    ok
  }
}
    `;

export function useCreateMockExamMutation() {
  return Urql.useMutation<CreateMockExamMutation, CreateMockExamMutationVariables>(CreateMockExamDocument);
};
export const CreateMockExamCategoryDocument = gql`
    mutation CreateMockExamCategory($input: CreateMockExamCategoryInput!) {
  createMockExamCategory(input: $input) {
    category {
      id
      name
    }
    error
    ok
  }
}
    `;

export function useCreateMockExamCategoryMutation() {
  return Urql.useMutation<CreateMockExamCategoryMutation, CreateMockExamCategoryMutationVariables>(CreateMockExamCategoryDocument);
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
export const ReadAllMockExamDocument = gql`
    query ReadAllMockExam($input: ReadAllMockExamsInput!) {
  readAllMockExam(input: $input) {
    error
    mockExams {
      id
    }
    ok
  }
}
    `;

export function useReadAllMockExamQuery(options: Omit<Urql.UseQueryArgs<ReadAllMockExamQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMockExamQuery, ReadAllMockExamQueryVariables>({ query: ReadAllMockExamDocument, ...options });
};