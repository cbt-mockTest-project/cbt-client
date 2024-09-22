import { gql } from '@apollo/client';

export const SEARCH_CATEGORIES_QUERY = gql`
  query SearchMockExamCategories($input: SearchMockExamCategoriesInput!) {
    searchMockExamCategories(input: $input) {
      ok
      categories {
        user {
          nickname
          profileImg
        }
        urlSlug
        examType
        id
        source
        evaluationCount
        name
        examCount
      }
    }
  }
`;
