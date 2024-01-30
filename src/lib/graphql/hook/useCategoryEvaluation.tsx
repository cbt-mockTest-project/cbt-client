import { useMutation, useQuery } from '@apollo/client';
import {
  CreateCategoryEvaluationMutation,
  CreateCategoryEvaluationMutationVariables,
  UpdateCategoryEvaluationMutation,
  UpdateCategoryEvaluationMutationVariables,
  DeleteCategoryEvaluationMutation,
  DeleteCategoryEvaluationMutationVariables,
  GetCategoryEvaluationQuery,
  GetCategoryEvaluationQueryVariables,
  CheckIfCategoryEvaluatedMutation,
  CheckIfCategoryEvaluatedMutationVariables,
} from '../query/categoryEvaluationQuery.generated';
import {
  CREATE_CATEGORY_EVALUATION,
  GET_CATEGORY_EVALUATION_QUERY,
  UPDATE_CATEGORY_EVALUATION,
  DELETE_CATEGORY_EVALUATION,
  CHECK_IF_CATEGORY_EVALUATED,
} from '../query/categoryEvaluationQuery';
import { GetCategoryEvaluationInput } from 'types';

export const useGetCategoryEvaluation = (input: GetCategoryEvaluationInput) =>
  useQuery<GetCategoryEvaluationQuery, GetCategoryEvaluationQueryVariables>(
    GET_CATEGORY_EVALUATION_QUERY,
    {
      variables: {
        input,
      },
    }
  );

export const useCreateCategoryEvaluation = () =>
  useMutation<
    CreateCategoryEvaluationMutation,
    CreateCategoryEvaluationMutationVariables
  >(CREATE_CATEGORY_EVALUATION);

export const useUpdateCategoryEvaluation = () =>
  useMutation<
    UpdateCategoryEvaluationMutation,
    UpdateCategoryEvaluationMutationVariables
  >(UPDATE_CATEGORY_EVALUATION);

export const useDeleteCategoryEvaluation = () =>
  useMutation<
    DeleteCategoryEvaluationMutation,
    DeleteCategoryEvaluationMutationVariables
  >(DELETE_CATEGORY_EVALUATION);

export const useCheckIfCategoryEvaluated = () =>
  useMutation<
    CheckIfCategoryEvaluatedMutation,
    CheckIfCategoryEvaluatedMutationVariables
  >(CHECK_IF_CATEGORY_EVALUATED);
