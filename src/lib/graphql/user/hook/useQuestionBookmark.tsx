import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  EDIT_QUESTION_BOOKMARK,
  READ_EXAM_TITLE_AND_ID_OF_BOOKMARKED_QUESTION,
  READ_QUESTION_BOOKMARK,
} from '../query/questionBookmarkQuery';
import {
  EditMockExamQuestionBookmarkMutation,
  EditMockExamQuestionBookmarkMutationVariables,
  ReadExamTitleAndIdOfBookmarkedQuestionQuery,
  ReadExamTitleAndIdOfBookmarkedQuestionQueryVariables,
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

export const useReadExamTitleAndIdOfBookmarkedQuestion = () =>
  useQuery<
    ReadExamTitleAndIdOfBookmarkedQuestionQuery,
    ReadExamTitleAndIdOfBookmarkedQuestionQueryVariables
  >(READ_EXAM_TITLE_AND_ID_OF_BOOKMARKED_QUESTION);
