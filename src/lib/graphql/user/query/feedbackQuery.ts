import { gql } from '@apollo/client';

export const CREATE_QUESTION_FEEDBACK = gql`
  mutation CreateMockExamQuestionFeedback(
    $input: CreateMockExamQuestionFeedbackInput!
  ) {
    createMockExamQuestionFeedback(input: $input) {
      error
      ok
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
