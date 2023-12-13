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
import {
  ADD_EXAM_TO_CATEGORY,
  GET_MY_EXAMS,
  REMOVE_EXAM_FROM_CATEGORY,
} from '../query/examQuery';
import {
  AddExamToCategoryMutation,
  AddExamToCategoryMutationVariables,
  GetMyExamsQuery,
  GetMyExamsQueryVariables,
  RemoveExamFromCategoryMutation,
  RemoveExamFromCategoryMutationVariables,
} from '../query/examQuery.generated';

export const useCreateExamHistory = () =>
  useMutation<
    CreateMockExamHistoryMutation,
    CreateMockExamHistoryMutationVariables
  >(CREATE_EXAM_HISTORY);

export const useReadExamHistories = () =>
  useQuery<ReadMyExamHistoryQuery, ReadMyExamHistoryQueryVariables>(
    READ_EXAM_HISTORIES
  );

export const useGetMyExams = () =>
  useQuery<GetMyExamsQuery, GetMyExamsQueryVariables>(GET_MY_EXAMS);

export const useAddExamToCategory = () =>
  useMutation<AddExamToCategoryMutation, AddExamToCategoryMutationVariables>(
    ADD_EXAM_TO_CATEGORY
  );

export const useRemoveExamFromCategory = () =>
  useMutation<
    RemoveExamFromCategoryMutation,
    RemoveExamFromCategoryMutationVariables
  >(REMOVE_EXAM_FROM_CATEGORY);
