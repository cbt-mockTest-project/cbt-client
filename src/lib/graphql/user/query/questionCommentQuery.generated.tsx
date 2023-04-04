import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { QusetionCommentPartsFragmentDoc } from './questionCommentFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMockExamQuestionCommentMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionCommentInput;
}>;


export type CreateMockExamQuestionCommentMutation = { __typename?: 'Mutation', createMockExamQuestionComment: { __typename?: 'CreateMockExamQuestionCommentOutput', error?: string | null, ok: boolean, comment: { __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } } } };

export type DeleteMockExamQuestionCommentMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamQuestionCommentInput;
}>;


export type DeleteMockExamQuestionCommentMutation = { __typename?: 'Mutation', deleteMockExamQuestionComment: { __typename?: 'DeleteMockExamQuestionCommentOutput', error?: string | null, ok: boolean } };

export type EditMockExamQuestionCommentMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionCommentInput;
}>;


export type EditMockExamQuestionCommentMutation = { __typename?: 'Mutation', editMockExamQuestionComment: { __typename?: 'EditMockExamQuestionCommentOutput', error?: string | null, ok: boolean } };

export type ReadMockExamQuestionCommentsByQuestionIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionCommentsByQuestionIdInput;
}>;


export type ReadMockExamQuestionCommentsByQuestionIdQuery = { __typename?: 'Query', readMockExamQuestionCommentsByQuestionId: { __typename?: 'ReadMockExamQuestionCommentsByQuestionIdOutput', comments?: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } }> | null } };

export type ReadExamTitleAndIdByQuestionCommentQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadExamTitleAndIdByQuestionCommentQuery = { __typename?: 'Query', readExamTitleAndIdByQuestionComment: { __typename?: 'ReadExamTitleAndIdByQuestionCommentOutput', error?: string | null, ok: boolean, examTitleAndId?: Array<{ __typename?: 'ExamTitleAndIdByQuestionComment', id: number, title: string }> | null } };

export type ReadMyQuestionCommentsQueryVariables = Types.Exact<{
  input: Types.ReadMyQuestionCommentsInput;
}>;


export type ReadMyQuestionCommentsQuery = { __typename?: 'Query', readMyQuestionComments: { __typename?: 'ReadMyQuestionCommentsOutput', error?: string | null, ok: boolean, questions?: Array<{ __typename?: 'MockExamQuestion', id: number, question: string, number: number, mockExam?: { __typename?: 'MockExam', title: string } | null, mockExamQuestionComment: Array<{ __typename?: 'MockExamQuestionComment', id: number, content: string, created_at: any }> }> | null } };


export const CreateMockExamQuestionCommentDocument = gql`
    mutation CreateMockExamQuestionComment($input: CreateMockExamQuestionCommentInput!) {
  createMockExamQuestionComment(input: $input) {
    error
    ok
    comment {
      ...QusetionCommentParts
    }
  }
}
    ${QusetionCommentPartsFragmentDoc}`;

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
export const ReadMockExamQuestionCommentsByQuestionIdDocument = gql`
    query ReadMockExamQuestionCommentsByQuestionId($input: ReadMockExamQuestionCommentsByQuestionIdInput!) {
  readMockExamQuestionCommentsByQuestionId(input: $input) {
    comments {
      created_at
      content
      likeState
      likesCount
      id
      user {
        nickname
        id
        role
      }
    }
  }
}
    `;

export function useReadMockExamQuestionCommentsByQuestionIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionCommentsByQuestionIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionCommentsByQuestionIdQuery, ReadMockExamQuestionCommentsByQuestionIdQueryVariables>({ query: ReadMockExamQuestionCommentsByQuestionIdDocument, ...options });
};
export const ReadExamTitleAndIdByQuestionCommentDocument = gql`
    query ReadExamTitleAndIdByQuestionComment {
  readExamTitleAndIdByQuestionComment {
    error
    examTitleAndId {
      id
      title
    }
    ok
  }
}
    `;

export function useReadExamTitleAndIdByQuestionCommentQuery(options?: Omit<Urql.UseQueryArgs<ReadExamTitleAndIdByQuestionCommentQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadExamTitleAndIdByQuestionCommentQuery, ReadExamTitleAndIdByQuestionCommentQueryVariables>({ query: ReadExamTitleAndIdByQuestionCommentDocument, ...options });
};
export const ReadMyQuestionCommentsDocument = gql`
    query ReadMyQuestionComments($input: ReadMyQuestionCommentsInput!) {
  readMyQuestionComments(input: $input) {
    questions {
      id
      question
      number
      mockExam {
        title
      }
      mockExamQuestionComment {
        id
        content
        created_at
      }
    }
    error
    ok
  }
}
    `;

export function useReadMyQuestionCommentsQuery(options: Omit<Urql.UseQueryArgs<ReadMyQuestionCommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMyQuestionCommentsQuery, ReadMyQuestionCommentsQueryVariables>({ query: ReadMyQuestionCommentsDocument, ...options });
};