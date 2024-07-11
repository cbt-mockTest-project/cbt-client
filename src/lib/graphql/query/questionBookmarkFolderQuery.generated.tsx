import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadQuestionBookmarkFoldersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadQuestionBookmarkFoldersQuery = { __typename?: 'Query', readQuestionBookmarkFolders: { __typename?: 'ReadQuestionBookmarkFoldersOutput', error?: string | null, ok: boolean, folders?: Array<{ __typename?: 'MockExamQuestionBookmarkFolder', name: string, id: number, created_at: any }> | null } };

export type CreateQuestionBookmarkFolderMutationVariables = Types.Exact<{
  input: Types.CreateQuestionBookmarkFolderInput;
}>;


export type CreateQuestionBookmarkFolderMutation = { __typename?: 'Mutation', createQuestionBookmarkFolder: { __typename?: 'CreateQuestionBookmarkFolderOutput', error?: string | null, ok: boolean } };

export type DeleteQuestionBookmarkFolderMutationVariables = Types.Exact<{
  input: Types.DeleteQuestionBookmarkFolderInput;
}>;


export type DeleteQuestionBookmarkFolderMutation = { __typename?: 'Mutation', deleteQuestionBookmarkFolder: { __typename?: 'DeleteQuestionBookmarkFolderOutput', error?: string | null, ok: boolean } };

export type UpdateQuestionBookmarkFolderMutationVariables = Types.Exact<{
  input: Types.UpdateQuestionBookmarkFolderInput;
}>;


export type UpdateQuestionBookmarkFolderMutation = { __typename?: 'Mutation', updateQuestionBookmarkFolder: { __typename?: 'UpdateQuestionBookmarkFolderOutput', error?: string | null, ok: boolean } };


export const ReadQuestionBookmarkFoldersDocument = gql`
    query ReadQuestionBookmarkFolders {
  readQuestionBookmarkFolders {
    error
    ok
    folders {
      name
      id
      created_at
    }
  }
}
    `;

export function useReadQuestionBookmarkFoldersQuery(options?: Omit<Urql.UseQueryArgs<ReadQuestionBookmarkFoldersQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadQuestionBookmarkFoldersQuery, ReadQuestionBookmarkFoldersQueryVariables>({ query: ReadQuestionBookmarkFoldersDocument, ...options });
};
export const CreateQuestionBookmarkFolderDocument = gql`
    mutation CreateQuestionBookmarkFolder($input: CreateQuestionBookmarkFolderInput!) {
  createQuestionBookmarkFolder(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateQuestionBookmarkFolderMutation() {
  return Urql.useMutation<CreateQuestionBookmarkFolderMutation, CreateQuestionBookmarkFolderMutationVariables>(CreateQuestionBookmarkFolderDocument);
};
export const DeleteQuestionBookmarkFolderDocument = gql`
    mutation DeleteQuestionBookmarkFolder($input: DeleteQuestionBookmarkFolderInput!) {
  deleteQuestionBookmarkFolder(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteQuestionBookmarkFolderMutation() {
  return Urql.useMutation<DeleteQuestionBookmarkFolderMutation, DeleteQuestionBookmarkFolderMutationVariables>(DeleteQuestionBookmarkFolderDocument);
};
export const UpdateQuestionBookmarkFolderDocument = gql`
    mutation UpdateQuestionBookmarkFolder($input: UpdateQuestionBookmarkFolderInput!) {
  updateQuestionBookmarkFolder(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateQuestionBookmarkFolderMutation() {
  return Urql.useMutation<UpdateQuestionBookmarkFolderMutation, UpdateQuestionBookmarkFolderMutationVariables>(UpdateQuestionBookmarkFolderDocument);
};