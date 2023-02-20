import { useMutation, useQuery } from '@apollo/client';
import { CREATE_VISIT, READ_VISIT_COUNT } from '../query/visitQuery';
import {
  CreateVisitMutation,
  CreateVisitMutationVariables,
  ReadVisitCountQuery,
  ReadVisitCountQueryVariables,
} from '../query/visitQuery.generated';

export const useReadVisitCount = () =>
  useQuery<ReadVisitCountQuery, ReadVisitCountQueryVariables>(READ_VISIT_COUNT);

export const useCreateVisit = () =>
  useMutation<CreateVisitMutation, CreateVisitMutationVariables>(CREATE_VISIT);
