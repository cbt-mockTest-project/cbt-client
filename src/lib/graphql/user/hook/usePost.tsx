import {
  useLazyQuery,
  useMutation,
  useQuery,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  READ_POST,
  READ_POSTS,
  VIEW_POST,
} from '../query/postQuery';
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
  EditPostMutation,
  EditPostMutationVariables,
  ReadPostQuery,
  ReadPostQueryVariables,
  ReadPostsQuery,
  ReadPostsQueryVariables,
  ViewPostMutation,
  ViewPostMutationVariables,
} from '../query/postQuery.generated';

export const useReadPost = () =>
  useQuery<ReadPostQuery, ReadPostQueryVariables>(READ_POST);

export const useLazyReadPost = (
  fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
) =>
  useLazyQuery<ReadPostQuery, ReadPostQueryVariables>(READ_POST, {
    fetchPolicy,
  });

export const useLazyReadPosts = (
  fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
) =>
  useLazyQuery<ReadPostsQuery, ReadPostsQueryVariables>(READ_POSTS, {
    fetchPolicy,
  });

export const useCreatePost = () =>
  useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST);

export const useEditPost = () =>
  useMutation<EditPostMutation, EditPostMutationVariables>(EDIT_POST);

export const useDeletePost = () =>
  useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST);

export const useViewPost = () =>
  useMutation<ViewPostMutation, ViewPostMutationVariables>(VIEW_POST);
