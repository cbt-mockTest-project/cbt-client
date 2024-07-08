import { gql } from '@apollo/client';

export const GET_CATEGORY_POINT_HISTORIES = gql`
  query GetCategoryPointHistories($input: GetCategoryPointHistoriesInput!) {
    getCategoryPointHistories(input: $input) {
      ok
      error
      categoryPointHistories {
        created_at
        buyer {
          nickname
          email
        }
        pointTransaction {
          point
          type
          description
        }
      }
    }
  }
`;
