import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMockExamQuestionFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionFeedbackInput;
}>;


export type CreateMockExamQuestionFeedbackMutation = { __typename?: 'Mutation', createMockExamQuestionFeedback: { __typename?: 'CreateMockExamQuestionFeedbackOutput', error?: string | null, ok: boolean, feedback?: { __typename?: 'MockExamQuestionFeedback', id: number, content: string, type: Types.QuestionFeedbackType, recommendationCount: { __typename?: 'RecommendationCount', bad: number, good: number }, myRecommedationStatus: { __typename?: 'MyRecommedationStatus', isGood: boolean, isBad: boolean }, user: { __typename?: 'User', nickname: string, id: number } } | null } };

export type CreateFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateFeedbackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'CreateFeedbackOutput', error?: string | null, ok: boolean } };

export type UpdateMockExamQuestionFeedbackRecommendationMutationVariables = Types.Exact<{
  input: Types.UpdateMockExamQuestionFeedbackRecommendationInput;
}>;


export type UpdateMockExamQuestionFeedbackRecommendationMutation = { __typename?: 'Mutation', updateMockExamQuestionFeedbackRecommendation: { __typename?: 'UpdateMockExamQuestionFeedbackRecommendationOutput', error?: string | null, ok: boolean, recommendation?: { __typename?: 'MockExamQuestionFeedbackRecommendation', type: Types.QuestionFeedbackRecommendationType } | null } };


export const CreateMockExamQuestionFeedbackDocument = gql`
    mutation CreateMockExamQuestionFeedback($input: CreateMockExamQuestionFeedbackInput!) {
  createMockExamQuestionFeedback(input: $input) {
    error
    ok
    feedback {
      id
      content
      type
      recommendationCount {
        bad
        good
      }
      myRecommedationStatus {
        isGood
        isBad
      }
      user {
        nickname
        id
      }
    }
  }
}
    `;

export function useCreateMockExamQuestionFeedbackMutation() {
  return Urql.useMutation<CreateMockExamQuestionFeedbackMutation, CreateMockExamQuestionFeedbackMutationVariables>(CreateMockExamQuestionFeedbackDocument);
};
export const CreateFeedbackDocument = gql`
    mutation CreateFeedback($input: CreateFeedbackInput!) {
  createFeedback(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateFeedbackMutation() {
  return Urql.useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument);
};
export const UpdateMockExamQuestionFeedbackRecommendationDocument = gql`
    mutation UpdateMockExamQuestionFeedbackRecommendation($input: UpdateMockExamQuestionFeedbackRecommendationInput!) {
  updateMockExamQuestionFeedbackRecommendation(input: $input) {
    error
    ok
    recommendation {
      type
    }
  }
}
    `;

export function useUpdateMockExamQuestionFeedbackRecommendationMutation() {
  return Urql.useMutation<UpdateMockExamQuestionFeedbackRecommendationMutation, UpdateMockExamQuestionFeedbackRecommendationMutationVariables>(UpdateMockExamQuestionFeedbackRecommendationDocument);
};