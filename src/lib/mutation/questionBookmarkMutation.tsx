import {
  CREATE_QUESTION_BOOKMARK_FOLDER,
  DELETE_QUESTION_BOOKMARK_FOLDER,
  UPDATE_QUESTION_BOOKMARK_FOLDER,
} from '@lib/graphql/query/questionBookmarkFolderQuery';
import {
  CreateQuestionBookmarkFolderMutation,
  CreateQuestionBookmarkFolderMutationVariables,
  DeleteQuestionBookmarkFolderMutation,
  DeleteQuestionBookmarkFolderMutationVariables,
  UpdateQuestionBookmarkFolderMutation,
  UpdateQuestionBookmarkFolderMutationVariables,
} from '@lib/graphql/query/questionBookmarkFolderQuery.generated';
import { GET_QUESTION_BOOKMARK_FOLDERS_QUERY_KEY } from '@lib/queryOptions/readQusetionBookmarkFolderQueryOption';
import { apolloClient } from '@modules/apollo';
import { useMutation } from '@tanstack/react-query';
import {
  CreateQuestionBookmarkFolderInput,
  CreateQuestionBookmarkInput,
  DeleteQuestionBookmarkFolderInput,
  DeleteQuestionBookmarkInput,
  MoveQuestionBookmarkInput,
  UpdateQuestionBookmarkFolderInput,
} from 'types';
import { queryClient } from '../../../pages/_app';
import { App } from 'antd';
import {
  CreateQuestionBookmarkMutation,
  CreateQuestionBookmarkMutationVariables,
  DeleteQuestionBookmarkMutation,
  DeleteQuestionBookmarkMutationVariables,
  MoveQuestionBookmarkMutation,
  MoveQuestionBookmarkMutationVariables,
} from '@lib/graphql/query/questionBookmarkQuery.generated';
import {
  CREATE_QUESTION_BOOKMARK,
  DELETE_QUESTION_BOOKMARK,
  MOVE_QUESTION_BOOKMARK,
} from '@lib/graphql/query/questionBookmarkQuery';

export const createQuestionBookmarkFolderMutationFn = (
  input: CreateQuestionBookmarkFolderInput
) =>
  apolloClient.mutate<
    CreateQuestionBookmarkFolderMutation,
    CreateQuestionBookmarkFolderMutationVariables
  >({
    mutation: CREATE_QUESTION_BOOKMARK_FOLDER,
    variables: {
      input,
    },
  });

export const updateQuestionBookmarkFolderMutationFn = (
  input: UpdateQuestionBookmarkFolderInput
) =>
  apolloClient.mutate<
    UpdateQuestionBookmarkFolderMutation,
    UpdateQuestionBookmarkFolderMutationVariables
  >({
    mutation: UPDATE_QUESTION_BOOKMARK_FOLDER,
    variables: {
      input,
    },
  });

export const deleteQuestionBookmarkFolderMutationFn = (
  input: DeleteQuestionBookmarkFolderInput
) =>
  apolloClient.mutate<
    DeleteQuestionBookmarkFolderMutation,
    DeleteQuestionBookmarkFolderMutationVariables
  >({
    mutation: DELETE_QUESTION_BOOKMARK_FOLDER,
    variables: {
      input,
    },
  });

export const deleteQuestionBookmarkMutationFn = (
  input: DeleteQuestionBookmarkInput
) =>
  apolloClient.mutate<
    DeleteQuestionBookmarkMutation,
    DeleteQuestionBookmarkMutationVariables
  >({
    mutation: DELETE_QUESTION_BOOKMARK,
    variables: {
      input,
    },
  });

export const createQuestionBookmarkMutationFn = (
  input: CreateQuestionBookmarkInput
) =>
  apolloClient.mutate<
    CreateQuestionBookmarkMutation,
    CreateQuestionBookmarkMutationVariables
  >({
    mutation: CREATE_QUESTION_BOOKMARK,
    variables: {
      input,
    },
  });

export const moveQuestionBookmarkMutationFn = (
  input: MoveQuestionBookmarkInput
) =>
  apolloClient.mutate<
    MoveQuestionBookmarkMutation,
    MoveQuestionBookmarkMutationVariables
  >({
    mutation: MOVE_QUESTION_BOOKMARK,
    variables: {
      input,
    },
  });

export const useCreateQuestionBookmarkFolderMutation = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: createQuestionBookmarkFolderMutationFn,
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: GET_QUESTION_BOOKMARK_FOLDERS_QUERY_KEY,
      });
    },
    onSuccess: (res) => {
      if (res.data.createQuestionBookmarkFolder.error) {
        message.error(res.data.createQuestionBookmarkFolder.error);
        return;
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};

export const useUpdateQuestionBookmarkFolderMutation = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: updateQuestionBookmarkFolderMutationFn,
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: GET_QUESTION_BOOKMARK_FOLDERS_QUERY_KEY,
      });
    },
    onSuccess: (res) => {
      if (res.data.updateQuestionBookmarkFolder.error) {
        message.error(res.data.updateQuestionBookmarkFolder.error);
        return;
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};

export const useDeleteQuestionBookmarkFolderMutation = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: deleteQuestionBookmarkFolderMutationFn,
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: GET_QUESTION_BOOKMARK_FOLDERS_QUERY_KEY,
      });
    },
    onSuccess: (res) => {
      if (res.data.deleteQuestionBookmarkFolder.error) {
        message.error(res.data.deleteQuestionBookmarkFolder.error);
        return;
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
