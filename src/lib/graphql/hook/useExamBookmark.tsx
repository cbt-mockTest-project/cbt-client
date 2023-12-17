import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { TOGGLE_EXAM_BOOKMARK } from '../query/examBookmarkQuery';
import {
  ToggleExamBookmarkMutation,
  ToggleExamBookmarkMutationVariables,
} from '../query/examBookmarkQuery.generated';

export const useToggleExamBookmark = () =>
  useMutation<ToggleExamBookmarkMutation, ToggleExamBookmarkMutationVariables>(
    TOGGLE_EXAM_BOOKMARK
  );
