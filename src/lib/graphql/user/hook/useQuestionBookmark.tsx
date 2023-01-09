import { useLazyQuery, useMutation } from '@apollo/client';
import {
  EDIT_QUESTION_BOOKMARK,
  READ_QUESTION_BOOKMARK,
} from '../query/questionBookmarkQuery';
import {
  EditMockExamQuestionBookmarkMutation,
  EditMockExamQuestionBookmarkMutationVariables,
  ReadMockExamQuestionBookmarkQuery,
  ReadMockExamQuestionBookmarkQueryVariables,
} from '../query/questionBookmarkQuery.generated';

export const useEditQuestionBookmark = () =>
  useMutation<
    EditMockExamQuestionBookmarkMutation,
    EditMockExamQuestionBookmarkMutationVariables
  >(EDIT_QUESTION_BOOKMARK);

export const useReadQuestionBookmark = () =>
  useLazyQuery<
    ReadMockExamQuestionBookmarkQuery,
    ReadMockExamQuestionBookmarkQueryVariables
  >(READ_QUESTION_BOOKMARK);
