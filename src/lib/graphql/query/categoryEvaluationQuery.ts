import { gql } from '@apollo/client';

export const GET_CATEGORY_EVALUATION_QUERY = gql`
  query GetCategoryEvaluation($input: GetCategoryEvaluationInput!) {
    getCategoryEvaluation(input: $input) {
      categoryEvaluations {
        isSecret
        score
        user {
          nickname
          id
        }
        feedback
        id
      }
      isEvaluated
      error
      ok
    }
  }
`;

export const CREATE_CATEGORY_EVALUATION = gql`
  mutation CreateCategoryEvaluation($input: CreateCategoryEvaluationInput!) {
    createCategoryEvaluation(input: $input) {
      error
      ok
      categoryEvaluation {
        isSecret
        score
        user {
          nickname
          id
        }
        feedback
        id
      }
    }
  }
`;

export const DELETE_CATEGORY_EVALUATION = gql`
  mutation DeleteCategoryEvaluation($input: DeleteCategoryEvaluationInput!) {
    deleteCategoryEvaluation(input: $input) {
      error
      ok
    }
  }
`;

export const UPDATE_CATEGORY_EVALUATION = gql`
  mutation UpdateCategoryEvaluation($input: UpdateCategoryEvaluationInput!) {
    updateCategoryEvaluation(input: $input) {
      error
      ok
    }
  }
`;
