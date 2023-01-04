import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMockExamQuestionCommentMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionCommentInput;
}>;


export type CreateMockExamQuestionCommentMutation = { __typename?: 'Mutation', createMockExamQuestionComment: { __typename?: 'CreateMockExamQuestionCommentOutput', error?: string | null, ok: boolean } };

export type DeleteMockExamQuestionCommentMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamQuestionCommentInput;
}>;


export type DeleteMockExamQuestionCommentMutation = { __typename?: 'Mutation', deleteMockExamQuestionComment: { __typename?: 'DeleteMockExamQuestionCommentOutput', error?: string | null, ok: boolean } };

export type EditMockExamQuestionCommentMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionCommentInput;
}>;


export type EditMockExamQuestionCommentMutation = { __typename?: 'Mutation', editMockExamQuestionComment: { __typename?: 'EditMockExamQuestionCommentOutput', error?: string | null, ok: boolean } };

export type ReadMockExamQuestionCommentsByQuestinIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionCommentsByQuestinIdInput;
}>;


export type ReadMockExamQuestionCommentsByQuestinIdQuery = { __typename?: 'Query', readMockExamQuestionCommentsByQuestinId: { __typename?: 'ReadMockExamQuestionCommentsByQuestinIdOutput', comments?: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, id: number, user: { __typename?: 'User', nickname: string } }> | null } };


export const CreateMockExamQuestionCommentDocument = gql`
    mutation CreateMockExamQuestionComment($input: CreateMockExamQuestionCommentInput!) {
  createMockExamQuestionComment(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateMockExamQuestionCommentMutation() {
  return Urql.useMutation<CreateMockExamQuestionCommentMutation, CreateMockExamQuestionCommentMutationVariables>(CreateMockExamQuestionCommentDocument);
};
export const DeleteMockExamQuestionCommentDocument = gql`
    mutation DeleteMockExamQuestionComment($input: DeleteMockExamQuestionCommentInput!) {
  deleteMockExamQuestionComment(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteMockExamQuestionCommentMutation() {
  return Urql.useMutation<DeleteMockExamQuestionCommentMutation, DeleteMockExamQuestionCommentMutationVariables>(DeleteMockExamQuestionCommentDocument);
};
export const EditMockExamQuestionCommentDocument = gql`
    mutation EditMockExamQuestionComment($input: EditMockExamQuestionCommentInput!) {
  editMockExamQuestionComment(input: $input) {
    error
    ok
  }
}
    `;

export function useEditMockExamQuestionCommentMutation() {
  return Urql.useMutation<EditMockExamQuestionCommentMutation, EditMockExamQuestionCommentMutationVariables>(EditMockExamQuestionCommentDocument);
};
export const ReadMockExamQuestionCommentsByQuestinIdDocument = gql`
    query ReadMockExamQuestionCommentsByQuestinId($input: ReadMockExamQuestionCommentsByQuestinIdInput!) {
  readMockExamQuestionCommentsByQuestinId(input: $input) {
    comments {
      created_at
      content
      likeState
      id
      user {
        nickname
      }
    }
  }
}
    `;

export function useReadMockExamQuestionCommentsByQuestinIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionCommentsByQuestinIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionCommentsByQuestinIdQuery, ReadMockExamQuestionCommentsByQuestinIdQueryVariables>({ query: ReadMockExamQuestionCommentsByQuestinIdDocument, ...options });
};