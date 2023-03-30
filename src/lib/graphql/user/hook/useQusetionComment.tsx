import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables } from '../query/questionCommentLikeQuery.generated';
import {
  CREATE_QUESTION_COMMENT,
  DELETE_QUESTION_COMMENT,
  EDIT_QUESTION_COMMENT,
  READ_EXAM_TITLE_AND_ID_BY_COMMENT,
  READ_MY_QUESTION_COMMENTS,
  READ_QUESTION_COMMENT,
} from '../query/questionCommentQuery';
import {
  CreateMockExamQuestionCommentMutation,
  CreateMockExamQuestionCommentMutationVariables,
  DeleteMockExamQuestionCommentMutation,
  DeleteMockExamQuestionCommentMutationVariables,
  EditMockExamQuestionCommentMutation,
  EditMockExamQuestionCommentMutationVariables,
  ReadExamTitleAndIdByQuestionCommentQuery,
  ReadExamTitleAndIdByQuestionCommentQueryVariables,
  ReadMockExamQuestionCommentsByQuestionIdQuery,
  ReadMockExamQuestionCommentsByQuestionIdQueryVariables,
  ReadMyQuestionCommentsQuery,
  ReadMyQuestionCommentsQueryVariables,
} from '../query/questionCommentQuery.generated';

export const useCreateQuestionCommnet = () =>
  useMutation<
    CreateMockExamQuestionCommentMutation,
    CreateMockExamQuestionCommentMutationVariables
  >(CREATE_QUESTION_COMMENT);
export const useDeleteQuestionCommnet = () =>
  useMutation<
    DeleteMockExamQuestionCommentMutation,
    DeleteMockExamQuestionCommentMutationVariables
  >(DELETE_QUESTION_COMMENT);
export const useEditQuestionCommnet = () =>
  useMutation<
    EditMockExamQuestionCommentMutation,
    EditMockExamQuestionCommentMutationVariables
  >(EDIT_QUESTION_COMMENT);
export const useLazyReadQuestionComment = () =>
  useLazyQuery<
    ReadMockExamQuestionCommentsByQuestionIdQuery,
    ReadMockExamQuestionCommentsByQuestionIdQueryVariables
  >(READ_QUESTION_COMMENT);
export const useReadQuestionComment = (questionId: number) =>
  useQuery<
    ReadMockExamQuestionCommentsByQuestionIdQuery,
    ReadMockExamQuestionCommentsByQuestionIdQueryVariables
  >(READ_QUESTION_COMMENT, { variables: { input: { questionId } } });

export const useReadExamTitleAndIdByComment = () =>
  useQuery<
    ReadExamTitleAndIdByQuestionCommentQuery,
    ReadExamTitleAndIdByQuestionCommentQueryVariables
  >(READ_EXAM_TITLE_AND_ID_BY_COMMENT);

export const useLazyReadMyQuestionComments = () =>
  useLazyQuery<
    ReadMyQuestionCommentsQuery,
    ReadMyQuestionCommentsQueryVariables
  >(READ_MY_QUESTION_COMMENTS);

export const useReadMyQuestionComments = () =>
  useQuery<ReadMyQuestionCommentsQuery, ReadMyQuestionCommentsQueryVariables>(
    READ_MY_QUESTION_COMMENTS
  );
