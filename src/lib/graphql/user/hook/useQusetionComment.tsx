import { useLazyQuery, useMutation } from '@apollo/client';
import { ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables } from '../query/questionCommentLikeQuery.generated';
import {
  CREATE_QUESTION_COMMENT,
  DELETE_QUESTION_COMMENT,
  EDIT_QUESTION_COMMENT,
  READ_QUESTION_COMMENT,
} from '../query/questionCommentQuery';
import {
  CreateMockExamQuestionCommentMutation,
  CreateMockExamQuestionCommentMutationVariables,
  DeleteMockExamQuestionCommentMutation,
  DeleteMockExamQuestionCommentMutationVariables,
  EditMockExamQuestionCommentMutation,
  EditMockExamQuestionCommentMutationVariables,
  ReadMockExamQuestionCommentsByQuestinIdQuery,
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
    ReadMockExamQuestionCommentsByQuestinIdQuery,
    ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables
  >(READ_QUESTION_COMMENT);
