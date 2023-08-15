import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_EXAM_CATEGORY_VIEWER,
  DELETE_EXAM_CATEGORY_VIEWER,
  GET_EXAM_CATEGORY_VIEWERS,
  GET_INVITED_EXAMS,
  UPDATE_EXAM_VIEWER_APPROVE_STATE,
} from '../query/examQuery';
import {
  CreateExamCategoryViewerMutation,
  CreateExamCategoryViewerMutationVariables,
  DeleteExamCategoryViewerMutation,
  DeleteExamCategoryViewerMutationVariables,
  GetExamCategoryViewersQuery,
  GetExamCategoryViewersQueryVariables,
  GetInvitedExamsQuery,
  GetInvitedExamsQueryVariables,
  UpdateExamViewerArroveStateMutation,
  UpdateExamViewerArroveStateMutationVariables,
} from '../query/examQuery.generated';

export const useCreateExamCategoryViewer = () =>
  useMutation<
    CreateExamCategoryViewerMutation,
    CreateExamCategoryViewerMutationVariables
  >(CREATE_EXAM_CATEGORY_VIEWER);

export const useLazyGetExamCategoryViewers = () =>
  useLazyQuery<
    GetExamCategoryViewersQuery,
    GetExamCategoryViewersQueryVariables
  >(GET_EXAM_CATEGORY_VIEWERS);

export const useDeleteExamCategoryViewer = () =>
  useMutation<
    DeleteExamCategoryViewerMutation,
    DeleteExamCategoryViewerMutationVariables
  >(DELETE_EXAM_CATEGORY_VIEWER);

export const useUpdateExamCategoryViewerApproveState = () =>
  useMutation<
    UpdateExamViewerArroveStateMutation,
    UpdateExamViewerArroveStateMutationVariables
  >(UPDATE_EXAM_VIEWER_APPROVE_STATE);

export const useGetInvitedExams = () =>
  useQuery<GetInvitedExamsQuery, GetInvitedExamsQueryVariables>(
    GET_INVITED_EXAMS
  );
