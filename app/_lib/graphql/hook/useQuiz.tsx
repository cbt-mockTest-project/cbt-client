import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_QUIZ_COMMENT,
  DELETE_QUIZ_COMMENT,
  EDIT_QUIZ_COMMENT,
  GET_QUIZES,
} from '../query/quizQuery';
import {
  CreateQuizCommentMutation,
  CreateQuizCommentMutationVariables,
  DeleteQuizCommentMutation,
  DeleteQuizCommentMutationVariables,
  EditQuizCommentMutation,
  EditQuizCommentMutationVariables,
  GetQuizsQuery,
  GetQuizsQueryVariables,
} from '../query/quizQuery.generated';
import { GetQuizsInput } from '../../../types';

export const useGetQuizs = (input: GetQuizsInput) =>
  useQuery<GetQuizsQuery, GetQuizsQueryVariables>(GET_QUIZES, {
    variables: { input },
  });

export const useLazyGetQuizs = () =>
  useLazyQuery<GetQuizsQuery, GetQuizsQueryVariables>(GET_QUIZES, {
    fetchPolicy: 'cache-and-network',
  });

export const useCreateQuizComment = () =>
  useMutation<CreateQuizCommentMutation, CreateQuizCommentMutationVariables>(
    CREATE_QUIZ_COMMENT
  );
export const useDeleteQuizComment = () =>
  useMutation<DeleteQuizCommentMutation, DeleteQuizCommentMutationVariables>(
    DELETE_QUIZ_COMMENT
  );
export const useEditQuizComment = () =>
  useMutation<EditQuizCommentMutation, EditQuizCommentMutationVariables>(
    EDIT_QUIZ_COMMENT
  );
