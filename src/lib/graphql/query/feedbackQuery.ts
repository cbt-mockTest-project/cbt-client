import { gql } from '@apollo/client';

export const CREATE_QUESTION_FEEDBACK = gql`
  mutation CreateMockExamQuestionFeedback(
    $input: CreateMockExamQuestionFeedbackInput!
  ) {
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

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      error
      ok
    }
  }
`;

export const UPDATE_FEEDBACK_RECOMMENDATION = gql`
  mutation UpdateMockExamQuestionFeedbackRecommendation(
    $input: UpdateMockExamQuestionFeedbackRecommendationInput!
  ) {
    updateMockExamQuestionFeedbackRecommendation(input: $input) {
      error
      ok
      recommendation {
        type
      }
    }
  }
`;

export const READ_FEEDBACK_BY_RECOMMENDATION_COUNT = gql`
  query GetFeedbacksByRecommendationCount(
    $input: GetFeedbacksByRecommendationCountInput!
  ) {
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

export const EDIT_QUESTION_FEEDBACK = gql`
  mutation EditMockExamQuestionFeedback(
    $input: EditMockExamQuestionFeedbackInput!
  ) {
    editMockExamQuestionFeedback(input: $input) {
      error
      ok
    }
  }
`;
