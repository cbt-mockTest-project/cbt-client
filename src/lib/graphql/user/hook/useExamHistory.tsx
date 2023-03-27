import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_EXAM_HISTORY,
  READ_EXAM_HISTORIES,
} from '../query/examHistoryQuery';
import {
  CreateMockExamHistoryMutation,
  CreateMockExamHistoryMutationVariables,
  ReadMyExamHistoryQuery,
  ReadMyExamHistoryQueryVariables,
} from '../query/examHistoryQuery.generated';

export const useCreateExamHistory = () =>
  useMutation<
    CreateMockExamHistoryMutation,
    CreateMockExamHistoryMutationVariables
  >(CREATE_EXAM_HISTORY);

export const useReadExamHistories = () =>
  useQuery<ReadMyExamHistoryQuery, ReadMyExamHistoryQueryVariables>(
    READ_EXAM_HISTORIES
  );
