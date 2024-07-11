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
import { apolloClient } from '@modules/apollo';
import {
  CreateQuestionBookmarkFolderInput,
  DeleteQuestionBookmarkFolderInput,
  UpdateQuestionBookmarkFolderInput,
} from 'types';

export const createQuestionBookmarkFolderMutation = (
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

export const updateQuestionBookmarkFolderMutation = (
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

export const deleteQuestionBookmarkFolderMutation = (
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
