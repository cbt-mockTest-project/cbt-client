import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { PostPartsFragmentDoc } from './postFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadPostQueryVariables = Types.Exact<{
  input: Types.ReadPostInput;
}>;


export type ReadPostQuery = { __typename?: 'Query', readPost: { __typename?: 'ReadPostOutput', error?: string | null, ok: boolean, post?: { __typename?: 'Post', content: string, created_at: any, id: number, title: string, updated_at: any, commentsCount: number, likesCount: number, view: number, user: { __typename?: 'User', id: number, nickname: string }, like: Array<{ __typename?: 'PostLike', id: number }> } | null } };

export type ReadPostsQueryVariables = Types.Exact<{
  input: Types.ReadPostsInput;
}>;


export type ReadPostsQuery = { __typename?: 'Query', readPosts: { __typename?: 'ReadPostsOutput', count: number, error?: string | null, ok: boolean, posts?: Array<{ __typename?: 'Post', content: string, created_at: any, id: number, title: string, updated_at: any, commentsCount: number, likesCount: number, view: number, user: { __typename?: 'User', id: number, nickname: string }, like: Array<{ __typename?: 'PostLike', id: number }> }> | null } };

export type CreatePostMutationVariables = Types.Exact<{
  input: Types.CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostOutput', error?: string | null, ok: boolean } };

export type DeletePostMutationVariables = Types.Exact<{
  input: Types.DeletePostInput;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostOutput', error?: string | null, ok: boolean } };

export type EditPostMutationVariables = Types.Exact<{
  input: Types.EditPostInput;
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'EditPostOutput', content?: string | null, error?: string | null, ok: boolean, title?: string | null } };


export const ReadPostDocument = gql`
    query ReadPost($input: ReadPostInput!) {
  readPost(input: $input) {
    error
    ok
    post {
      ...PostParts
    }
  }
}
    ${PostPartsFragmentDoc}`;

export function useReadPostQuery(options: Omit<Urql.UseQueryArgs<ReadPostQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadPostQuery, ReadPostQueryVariables>({ query: ReadPostDocument, ...options });
};
export const ReadPostsDocument = gql`
    query ReadPosts($input: ReadPostsInput!) {
  readPosts(input: $input) {
    count
    error
    ok
    posts {
      ...PostParts
    }
  }
}
    ${PostPartsFragmentDoc}`;

export function useReadPostsQuery(options: Omit<Urql.UseQueryArgs<ReadPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadPostsQuery, ReadPostsQueryVariables>({ query: ReadPostsDocument, ...options });
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    error
    ok
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    error
    ok
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const EditPostDocument = gql`
    mutation EditPost($input: EditPostInput!) {
  editPost(input: $input) {
    content
    error
    ok
    title
  }
}
    `;

export function useEditPostMutation() {
  return Urql.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument);
};