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

export const GET_EXAM_TITLE_WITH_FEEDBACK = gql`
  query GetExamTitleWithFeedback {
    getExamTitleWithFeedback {
      error
      ok
      titles {
        id
        title
      }
    }
  }
`;
