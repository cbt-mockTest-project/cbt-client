import { gql } from '@apollo/client';

export const CREATE_EXAM_HISTORY = gql`
  mutation CreateMockExamHistory($input: CreateMockExamHistoryInput!) {
    createMockExamHistory(input: $input) {
      error
      ok
    }
  }
`;

export const READ_EXAM_HISTORIES = gql`
  query ReadMyExamHistory {
    readMyExamHistory {
      error
      mockExams {
        id
        title
        updated_at
      }
    }
  }
`;
