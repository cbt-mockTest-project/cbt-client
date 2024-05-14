import { gql } from '@apollo/client';

export const GET_MY_POINT_TRANSACTIONS = gql`
  query GetPointTransactions {
    getPointTransactions {
      error
      ok
      pointTransactions {
        id
        point
        type
        description
        created_at
      }
    }
  }
`;
