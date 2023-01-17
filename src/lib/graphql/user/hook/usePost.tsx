import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  READ_POST,
  READ_POSTS,
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
} from '../query/postQuery.generated';

export const useReadPost = () =>
  useQuery<ReadPostQuery, ReadPostQueryVariables>(READ_POST);

export const useLazyReadPost = () =>
  useLazyQuery<ReadPostQuery, ReadPostQueryVariables>(READ_POST);

export const useLazyReadPosts = () =>
  useLazyQuery<ReadPostsQuery, ReadPostsQueryVariables>(READ_POSTS);

export const useCreatePost = () =>
  useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST);

export const useEditPost = () =>
  useMutation<EditPostMutation, EditPostMutationVariables>(EDIT_POST);

export const useDeletePost = () =>
  useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST);
