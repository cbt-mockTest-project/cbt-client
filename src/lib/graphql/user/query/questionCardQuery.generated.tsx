import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadMyQuestionCardCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadMyQuestionCardCategoriesQuery = { __typename?: 'Query', readMyQuestionCardCategories: { __typename?: 'ReadMyQuestionCardCategoriesOutput', error?: string | null, ok: boolean, categories?: Array<{ __typename?: 'QuestionCardCategory', created_at: any, id: number, name: string, updated_at: any }> | null } };

export type CreateQuestionCardCategoryMutationVariables = Types.Exact<{
  input: Types.CreateQuestionCardCategoryInput;
}>;


export type CreateQuestionCardCategoryMutation = { __typename?: 'Mutation', createQuestionCardCategory: { __typename?: 'CreateQuestionCardCategoryOutput', error?: string | null, ok: boolean, category?: { __typename?: 'QuestionCardCategory', name: string, id: number, created_at: any, updated_at: any } | null } };

export type UpdateQuestionCardCategoryMutationVariables = Types.Exact<{
  input: Types.UpdateQuestionCardCategoryInput;
}>;


export type UpdateQuestionCardCategoryMutation = { __typename?: 'Mutation', updateQuestionCardCategory: { __typename?: 'UpdateQuestionCardCategoryOutput', error?: string | null, ok: boolean, category?: { __typename?: 'QuestionCardCategory', created_at: any, updated_at: any, id: number, name: string } | null } };

export type DeleteQuestionCardCategoryMutationVariables = Types.Exact<{
  input: Types.DeleteQuestionCardCategoryInput;
}>;


export type DeleteQuestionCardCategoryMutation = { __typename?: 'Mutation', deleteQuestionCardCategory: { __typename?: 'DeleteQuestionCardCategoryOutput', error?: string | null, ok: boolean } };


export const ReadMyQuestionCardCategoriesDocument = gql`
    query ReadMyQuestionCardCategories {
  readMyQuestionCardCategories {
    error
    ok
    categories {
      created_at
      id
      name
      updated_at
    }
  }
}
    `;

export function useReadMyQuestionCardCategoriesQuery(options?: Omit<Urql.UseQueryArgs<ReadMyQuestionCardCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMyQuestionCardCategoriesQuery, ReadMyQuestionCardCategoriesQueryVariables>({ query: ReadMyQuestionCardCategoriesDocument, ...options });
};
export const CreateQuestionCardCategoryDocument = gql`
    mutation CreateQuestionCardCategory($input: CreateQuestionCardCategoryInput!) {
  createQuestionCardCategory(input: $input) {
    category {
      name
      id
      created_at
      updated_at
    }
    error
    ok
  }
}
    `;

export function useCreateQuestionCardCategoryMutation() {
  return Urql.useMutation<CreateQuestionCardCategoryMutation, CreateQuestionCardCategoryMutationVariables>(CreateQuestionCardCategoryDocument);
};
export const UpdateQuestionCardCategoryDocument = gql`
    mutation UpdateQuestionCardCategory($input: UpdateQuestionCardCategoryInput!) {
  updateQuestionCardCategory(input: $input) {
    error
    ok
    category {
      created_at
      updated_at
      id
      name
    }
  }
}
    `;

export function useUpdateQuestionCardCategoryMutation() {
  return Urql.useMutation<UpdateQuestionCardCategoryMutation, UpdateQuestionCardCategoryMutationVariables>(UpdateQuestionCardCategoryDocument);
};
export const DeleteQuestionCardCategoryDocument = gql`
    mutation DeleteQuestionCardCategory($input: DeleteQuestionCardCategoryInput!) {
  deleteQuestionCardCategory(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteQuestionCardCategoryMutation() {
  return Urql.useMutation<DeleteQuestionCardCategoryMutation, DeleteQuestionCardCategoryMutationVariables>(DeleteQuestionCardCategoryDocument);
};