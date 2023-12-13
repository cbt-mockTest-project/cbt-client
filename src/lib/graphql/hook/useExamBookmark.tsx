import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  GET_MY_BOOKMARKED_EXAMS,
  TOGGLE_EXAM_BOOKMARK,
} from '../query/examBookmarkQuery';
import {
  GetMyBookmarkedExamsQuery,
  GetMyBookmarkedExamsQueryVariables,
  ToggleExamBookmarkMutation,
  ToggleExamBookmarkMutationVariables,
} from '../query/examBookmarkQuery.generated';

export const useLazyGetMyBookmarkedExams = () =>
  useLazyQuery<GetMyBookmarkedExamsQuery, GetMyBookmarkedExamsQueryVariables>(
    GET_MY_BOOKMARKED_EXAMS
  );

export const useToggleExamBookmark = () =>
  useMutation<ToggleExamBookmarkMutation, ToggleExamBookmarkMutationVariables>(
    TOGGLE_EXAM_BOOKMARK
  );
