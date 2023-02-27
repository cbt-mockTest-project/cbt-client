import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_VISIT,
  READ_VISIT_COUNT,
  READ_VISIT_HISTORY,
} from '../query/visitQuery';
import {
  CreateVisitMutation,
  CreateVisitMutationVariables,
  ReadVisitCountQuery,
  ReadVisitCountQueryVariables,
  ReadVisitHistoryQuery,
  ReadVisitHistoryQueryVariables,
} from '../query/visitQuery.generated';

export const useReadVisitCount = () =>
  useQuery<ReadVisitCountQuery, ReadVisitCountQueryVariables>(READ_VISIT_COUNT);

export const useCreateVisit = () =>
  useMutation<CreateVisitMutation, CreateVisitMutationVariables>(CREATE_VISIT);

export const useReadVisitHistory = () =>
  useQuery<ReadVisitHistoryQuery, ReadVisitHistoryQueryVariables>(
    READ_VISIT_HISTORY
  );
