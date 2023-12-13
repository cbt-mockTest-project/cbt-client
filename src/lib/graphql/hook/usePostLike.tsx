import { useMutation } from '@apollo/client';
import { EDIT_POST_QUERY } from '../query/postLikeQuery';
import {
  EditPostLikeMutation,
  EditPostLikeMutationVariables,
} from '../query/postLikeQuery.generated';

export const useEditPostLike = () =>
  useMutation<EditPostLikeMutation, EditPostLikeMutationVariables>(
    EDIT_POST_QUERY
  );
