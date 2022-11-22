import { gql } from '@apollo/client';

export const READ_EXAM_CATEGORIES_QUERY = gql`
  query ReadAllMockExamCategories {
    readAllMockExamCategories {
      categories {
        name
      }
      error
      ok
    }
  }
`;
