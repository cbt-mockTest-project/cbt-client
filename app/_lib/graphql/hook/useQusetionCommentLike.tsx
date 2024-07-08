import { useLazyQuery, useMutation } from '@apollo/client';
import {
  EDIT_QUESTION_COMMENT_LIKE,
  READ_QUESTION_COMMENT_LIKE_COUNT,
} from '../query/questionCommentLikeQuery';
import {
  EditMockExamQuestionCommentLikeMutation,
  EditMockExamQuestionCommentLikeMutationVariables,
  ReadMockExamQuestionCommentLikesByQuestinIdQuery,
  ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables,
} from '../query/questionCommentLikeQuery.generated';

export const useEditQuestionCommentLike = () =>
  useMutation<
    EditMockExamQuestionCommentLikeMutation,
    EditMockExamQuestionCommentLikeMutationVariables
  >(EDIT_QUESTION_COMMENT_LIKE);

export const useLazyReadQuestionCommentLike = () =>
  useLazyQuery<
    ReadMockExamQuestionCommentLikesByQuestinIdQuery,
    ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables
  >(READ_QUESTION_COMMENT_LIKE_COUNT);
