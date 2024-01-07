import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  AcceptExamCategoryInvitationMutation,
  AcceptExamCategoryInvitationMutationVariables,
  CreateExamCategoryInvitationMutation,
  CreateExamCategoryInvitationMutationVariables,
  DeleteExamCategoryInvitationMutation,
  DeleteExamCategoryInvitationMutationVariables,
  GetExamCategoryInvitationsQuery,
  GetExamCategoryInvitationsQueryVariables,
} from '../query/examCategoryInvitationQuery.generated';
import {
  ACCEPT_CATEGORY_INVITATION,
  CREATE_CATEGORY_INVITATION,
  DELETE_CATEGORY_INVITATION,
  GET_CATEGORY_INVITATION,
} from '../query/examCategoryInvitationQuery';

export const useCreateCategoryInvitation = () =>
  useMutation<
    CreateExamCategoryInvitationMutation,
    CreateExamCategoryInvitationMutationVariables
  >(CREATE_CATEGORY_INVITATION);

export const useGetCategoryInvitations = () =>
  useQuery<
    GetExamCategoryInvitationsQuery,
    GetExamCategoryInvitationsQueryVariables
  >(GET_CATEGORY_INVITATION);

export const useDeleteCategoryInvitation = () =>
  useMutation<
    DeleteExamCategoryInvitationMutation,
    DeleteExamCategoryInvitationMutationVariables
  >(DELETE_CATEGORY_INVITATION);

export const useAcceptCategoryInvitation = () =>
  useMutation<
    AcceptExamCategoryInvitationMutation,
    AcceptExamCategoryInvitationMutationVariables
  >(ACCEPT_CATEGORY_INVITATION);
