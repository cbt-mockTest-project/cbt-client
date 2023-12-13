import { useMutation } from '@apollo/client';
import {
  CREATE_POST_COMMENT,
  DELETE_POST_COMMENT,
  EDIT_POST_COMMENT,
} from '../query/postComment';
import {
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables,
  DeletePostCommentMutation,
  DeletePostCommentMutationVariables,
  EditPostCommentMutation,
  EditPostCommentMutationVariables,
} from '../query/postComment.generated';

export const useCreatePostComment = () =>
  useMutation<CreatePostCommentMutation, CreatePostCommentMutationVariables>(
    CREATE_POST_COMMENT
  );
export const useEditPostComment = () =>
  useMutation<EditPostCommentMutation, EditPostCommentMutationVariables>(
    EDIT_POST_COMMENT
  );
export const useDeletePostComment = () =>
  useMutation<DeletePostCommentMutation, DeletePostCommentMutationVariables>(
    DELETE_POST_COMMENT
  );
