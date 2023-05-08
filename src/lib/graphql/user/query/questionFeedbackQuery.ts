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

export const GET_FEEDBACKS_WITH_FILTER = gql`
  query GetFeedbacksWithFilter($input: GetFeedbacksWithFilterInput!) {
    getFeedbacksWithFilter(input: $input) {
      error
      ok
      feedbacks {
        id
        created_at
        content
        type
        user {
          id
          nickname
        }
        mockExamQuestion {
          id
        }
        recommendationCount {
          bad
          good
        }
      }
    }
  }
`;
