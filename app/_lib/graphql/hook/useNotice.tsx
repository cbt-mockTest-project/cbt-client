import { useMutation, useSubscription } from '@apollo/client';
import {
  DELETE_ALL_NOTICE,
  DELETE_NOTICE,
  EDIT_NOTICE,
} from '../query/noticeQuery';
import {
  DeleteAllNoticesOfMeMutation,
  DeleteAllNoticesOfMeMutationVariables,
  DeleteNoticeMutation,
  DeleteNoticeMutationVariables,
  EditNoticeMutation,
  EditNoticeMutationVariables,
} from '../query/noticeQuery.generated';

export const useEditNotice = () =>
  useMutation<EditNoticeMutation, EditNoticeMutationVariables>(EDIT_NOTICE);

export const useDeleteNotice = () =>
  useMutation<DeleteNoticeMutation, DeleteNoticeMutationVariables>(
    DELETE_NOTICE
  );

export const useDeleteAllNotices = () =>
  useMutation<
    DeleteAllNoticesOfMeMutation,
    DeleteAllNoticesOfMeMutationVariables
  >(DELETE_ALL_NOTICE);

// export const usePostCommentNotice = () =>
//   useSubscription<
//     PostCommentUpdatesSubscription,
//     PostCommentUpdatesSubscriptionVariables
//   >(POST_COMMENT_NOTICE);
