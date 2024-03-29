import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMockExamQuestionFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionFeedbackInput;
}>;


export type CreateMockExamQuestionFeedbackMutation = { __typename?: 'Mutation', createMockExamQuestionFeedback: { __typename?: 'CreateMockExamQuestionFeedbackOutput', error?: string | null, ok: boolean, feedback?: { __typename?: 'MockExamQuestionFeedback', id: number, content: string, type: Types.QuestionFeedbackType, created_at: any, recommendationCount: { __typename?: 'RecommendationCount', bad: number, good: number }, myRecommedationStatus: { __typename?: 'MyRecommedationStatus', isGood: boolean, isBad: boolean }, user?: { __typename?: 'User', nickname: string, id: number } | null } | null } };

export type CreateFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateFeedbackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'CreateFeedbackOutput', error?: string | null, ok: boolean } };

export type UpdateMockExamQuestionFeedbackRecommendationMutationVariables = Types.Exact<{
  input: Types.UpdateMockExamQuestionFeedbackRecommendationInput;
}>;


export type UpdateMockExamQuestionFeedbackRecommendationMutation = { __typename?: 'Mutation', updateMockExamQuestionFeedbackRecommendation: { __typename?: 'UpdateMockExamQuestionFeedbackRecommendationOutput', error?: string | null, ok: boolean, recommendation?: { __typename?: 'MockExamQuestionFeedbackRecommendation', type: Types.QuestionFeedbackRecommendationType } | null } };

export type GetFeedbacksByRecommendationCountQueryVariables = Types.Exact<{
  input: Types.GetFeedbacksByRecommendationCountInput;
}>;


export type GetFeedbacksByRecommendationCountQuery = { __typename?: 'Query', getFeedbacksByRecommendationCount: { __typename?: 'GetFeedbacksByRecommendationCountOutput', error?: string | null, feedbacks?: Array<{ __typename?: 'MockExamQuestionFeedback', content: string, id: number, recommendation: Array<{ __typename?: 'MockExamQuestionFeedbackRecommendation', type: Types.QuestionFeedbackRecommendationType, id: number }>, mockExamQuestion: { __typename?: 'MockExamQuestion', id: number, question?: string | null, solution?: string | null } }> | null } };

export type EditMockExamQuestionFeedbackMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionFeedbackInput;
}>;


export type EditMockExamQuestionFeedbackMutation = { __typename?: 'Mutation', editMockExamQuestionFeedback: { __typename?: 'EditMockExamQuestionFeedbackOutput', error?: string | null, ok: boolean } };


export const CreateMockExamQuestionFeedbackDocument = gql`
    mutation CreateMockExamQuestionFeedback($input: CreateMockExamQuestionFeedbackInput!) {
  createMockExamQuestionFeedback(input: $input) {
    error
    ok
    feedback {
      id
      content
      type
      created_at
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
export const GetFeedbacksByRecommendationCountDocument = gql`
    query GetFeedbacksByRecommendationCount($input: GetFeedbacksByRecommendationCountInput!) {
  getFeedbacksByRecommendationCount(input: $input) {
    error
    feedbacks {
      content
      id
      recommendation {
        type
        id
      }
      mockExamQuestion {
        id
        question
        solution
      }
    }
  }
}
    `;

export function useGetFeedbacksByRecommendationCountQuery(options: Omit<Urql.UseQueryArgs<GetFeedbacksByRecommendationCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFeedbacksByRecommendationCountQuery, GetFeedbacksByRecommendationCountQueryVariables>({ query: GetFeedbacksByRecommendationCountDocument, ...options });
};
export const EditMockExamQuestionFeedbackDocument = gql`
    mutation EditMockExamQuestionFeedback($input: EditMockExamQuestionFeedbackInput!) {
  editMockExamQuestionFeedback(input: $input) {
    error
    ok
  }
}
    `;

export function useEditMockExamQuestionFeedbackMutation() {
  return Urql.useMutation<EditMockExamQuestionFeedbackMutation, EditMockExamQuestionFeedbackMutationVariables>(EditMockExamQuestionFeedbackDocument);
};