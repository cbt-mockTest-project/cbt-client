import { Feedback } from './../../../../types';
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
