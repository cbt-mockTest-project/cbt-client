import { useMutation } from '@apollo/client';
import { EDIT_POST_COMMENT_LIKE } from '../query/postCommentLikeQuery';
import {
  EditPostCommentLikeMutation,
  EditPostCommentLikeMutationVariables,
} from '../query/postCommentLikeQuery.generated';

export const useEditPostCommentLike = () =>
  useMutation<
    EditPostCommentLikeMutation,
    EditPostCommentLikeMutationVariables
  >(EDIT_POST_COMMENT_LIKE);
