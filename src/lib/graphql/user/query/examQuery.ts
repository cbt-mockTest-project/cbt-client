import { gql } from '@apollo/client';

export const READ_EXAM_CATEGORIES_QUERY = gql`
  query ReadAllMockExamCategories {
    readAllMockExamCategories {
      categories {
        name
        id
      }
      error
      ok
    }
  }
`;

export const READ_EXAM_TITLES_QUERY = gql`
  query ReadMockExamTitlesByCateory($input: ReadMockExamTitlesByCateoryInput!) {
    readMockExamTitlesByCateory(input: $input) {
      titles {
        id
        title
      }
      ok
      error
    }
  }
`;

export const FIND_MY_EXAM_HISTORY_QUERY = gql`
  query FindMyExamHistory($input: FindMyExamHistoryInput!) {
    findMyExamHistory(input: $input) {
      error
      ok
      titleAndId {
        id
        title
      }
    }
  }
`;
