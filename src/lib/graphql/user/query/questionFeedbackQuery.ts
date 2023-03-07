import { gql } from '@apollo/client';

export const DELETE_QUESTION_FEEDBACK = gql`
  mutation DeleteMockExamQuestionFeedback(
    $input: DeleteMockExamQuestionFeedbackInput!
  ) {
    deleteMockExamQuestionFeedback(input: $input) {
      error
      ok
    }
  }
`;
