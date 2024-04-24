import { CreateQuizCommentInput, EditQuizCommentInput } from 'types';
import {
  CREATE_QUIZ_COMMENT,
  DELETE_QUIZ_COMMENT,
  EDIT_QUIZ_COMMENT,
  GET_QUIZES,
} from '@lib/graphql/query/quizQuery';
import {
  CreateQuizCommentMutation,
  CreateQuizCommentMutationVariables,
  EditQuizCommentMutation,
  EditQuizCommentMutationVariables,
  GetQuizsQuery,
  GetQuizsQueryVariables,
} from '@lib/graphql/query/quizQuery.generated';
import { convertServerTimeToKST, handleError } from '@lib/utils/utils';
import { message } from 'antd';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { initializeApollo } from '@modules/apollo';
import { queryClient } from '../../../pages/_app';

const useQuizs = () => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const categoryId = Number(router.query.categoryId);
  const quizQueryOptions = queryOptions({
    queryKey: ['getQuizs', categoryId],
    queryFn: async () => {
      if (!categoryId) return;
      const { data } = await apolloClient.query<
        GetQuizsQuery,
        GetQuizsQueryVariables
      >({
        query: GET_QUIZES,
        variables: {
          input: {
            categoryId,
            date: convertServerTimeToKST(
              new Date().toISOString(),
              'yyyy-MM-dd'
            ),
          },
        },
      });
      return data;
    },
  });

  const { data } = useQuery(quizQueryOptions);

  const createQuizCommentMutation = useMutation({
    mutationKey: ['createQuizComment', categoryId],
    mutationFn: async (input: CreateQuizCommentInput) => {
      const {
        data: { createQuizComment },
      } = await apolloClient.mutate<
        CreateQuizCommentMutation,
        CreateQuizCommentMutationVariables
      >({
        mutation: CREATE_QUIZ_COMMENT,
        variables: { input },
      });
      return createQuizComment;
    },
    onError: (error) => {
      message.error('댓글을 작성하는데 실패했습니다.');
      handleError(error);
    },
    onSuccess: (data, input) => {
      if (data.error) {
        return message.error(data.error);
      }
      queryClient.setQueryData<GetQuizsQuery>(
        quizQueryOptions.queryKey,
        (prev: GetQuizsQuery) => {
          return {
            ...prev,
            getQuizs: {
              ...prev.getQuizs,
              quizs: prev.getQuizs.quizs.map((quiz) => {
                if (quiz.id === input.quizId) {
                  return {
                    ...quiz,
                    comment: [data.comment, ...quiz.comment],
                  };
                }
                return quiz;
              }),
            },
          };
        }
      );
    },
  });

  const editQuizCommentMutation = useMutation({
    mutationKey: ['editQuizComment', categoryId],
    mutationFn: async (input: EditQuizCommentInput) => {
      const {
        data: { editQuizComment },
      } = await apolloClient.mutate<
        EditQuizCommentMutation,
        EditQuizCommentMutationVariables
      >({
        mutation: EDIT_QUIZ_COMMENT,
        variables: { input },
      });
      return editQuizComment;
    },
    onError: (error) => {
      message.error('댓글 수정에 실패했습니다.');
      handleError(error);
    },
    onSuccess: (data, input) => {
      if (data.error) {
        return message.error(data.error);
      }
      queryClient.setQueryData<GetQuizsQuery>(
        quizQueryOptions.queryKey,
        (prev: GetQuizsQuery) => {
          return {
            ...prev,
            getQuizs: {
              ...prev.getQuizs,
              quizs: prev.getQuizs.quizs.map((quiz) => {
                return {
                  ...quiz,
                  comment: quiz.comment.map((comment) => {
                    if (comment.id === input.id) {
                      return { ...comment, content: input.content };
                    }
                    return comment;
                  }),
                };
              }),
            },
          };
        }
      );
    },
  });

  const deleteQuizCommentMutation = useMutation({
    mutationKey: ['deleteQuizComment', categoryId],
    mutationFn: async (commentId: number) => {
      const {
        data: { deleteQuizComment },
      } = await apolloClient.mutate({
        mutation: DELETE_QUIZ_COMMENT,
        variables: { input: { id: commentId } },
      });
      return deleteQuizComment;
    },
    onError: (error) => {
      message.error('댓글 삭제에 실패했습니다.');
      handleError(error);
    },
    onSuccess: (data, commentId) => {
      if (data.error) {
        return message.error(data.error);
      }
      queryClient.setQueryData<GetQuizsQuery>(
        quizQueryOptions.queryKey,
        (prev: GetQuizsQuery) => {
          return {
            ...prev,
            getQuizs: {
              ...prev.getQuizs,
              quizs: prev.getQuizs.quizs.map((quiz) => {
                return {
                  ...quiz,
                  comment: quiz.comment.filter(
                    (comment) => comment.id !== commentId
                  ),
                };
              }),
            },
          };
        }
      );
    },
  });

  return {
    createQuizCommentMutation,
    editQuizCommentMutation,
    deleteQuizCommentMutation,
    quizs: data?.getQuizs.quizs || [],
  };
};

export default useQuizs;
