import { gql } from '@apollo/client';
export const CREATE_FEEDBACK = gql`
  mutation CreateMockExamQuestionFeedback(
    $input: CreateMockExamQuestionFeedbackInput!
  ) {
    createMockExamQuestionFeedback(input: $input) {
      error
      ok
    }
  }
`;
