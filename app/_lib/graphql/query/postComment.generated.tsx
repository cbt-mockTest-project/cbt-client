import * as Types from '../../../types';

import gql from 'graphql-tag';
import { PostCommentPartsFragmentDoc } from './postCommentFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreatePostCommentMutationVariables = Types.Exact<{
  input: Types.CreatePostCommentInput;
}>;


export type CreatePostCommentMutation = { __typename?: 'Mutation', createPostComment: { __typename?: 'CreatePostCommentOutput', error?: string | null, ok: boolean, comment: { __typename?: 'PostComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number } } } };

export type DeletePostCommentMutationVariables = Types.Exact<{
  input: Types.DeletePostCommentInput;
}>;


export type DeletePostCommentMutation = { __typename?: 'Mutation', deletePostComment: { __typename?: 'DeletePostCommentOutput', error?: string | null, ok: boolean } };

export type EditPostCommentMutationVariables = Types.Exact<{
  input: Types.EditPostCommentInput;
}>;


export type EditPostCommentMutation = { __typename?: 'Mutation', editPostComment: { __typename?: 'EditPostCommentOutput', error?: string | null, ok: boolean } };


export const CreatePostCommentDocument = gql`
    mutation CreatePostComment($input: CreatePostCommentInput!) {
  createPostComment(input: $input) {
    error
    ok
    comment {
      ...PostCommentParts
    }
  }
}
    ${PostCommentPartsFragmentDoc}`;

export function useCreatePostCommentMutation() {
  return Urql.useMutation<CreatePostCommentMutation, CreatePostCommentMutationVariables>(CreatePostCommentDocument);
};
export const DeletePostCommentDocument = gql`
    mutation DeletePostComment($input: DeletePostCommentInput!) {
  deletePostComment(input: $input) {
    error
    ok
  }
}
    `;

export function useDeletePostCommentMutation() {
  return Urql.useMutation<DeletePostCommentMutation, DeletePostCommentMutationVariables>(DeletePostCommentDocument);
};
export const EditPostCommentDocument = gql`
    mutation EditPostComment($input: EditPostCommentInput!) {
  editPostComment(input: $input) {
    error
    ok
  }
}
    `;

export function useEditPostCommentMutation() {
  return Urql.useMutation<EditPostCommentMutation, EditPostCommentMutationVariables>(EditPostCommentDocument);
};