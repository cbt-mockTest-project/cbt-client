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

export const GET_POINT_TRANSACTIONS_FOR_ADMIN = gql`
  query GetPointTransactionsForAdmin(
    $input: GetPointTransactionsForAdminInput!
  ) {
    getPointTransactionsForAdmin(input: $input) {
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

export const CREATE_POINT_TRANSACTION_FOR_ADMIN = gql`
  mutation CreatePointTransactionForAdmin(
    $input: CreatePointTransactionForAdminInput!
  ) {
    createPointTransactionForAdmin(input: $input) {
      error
      ok
      pointTransaction {
        id
        point
        type
        description
      }
    }
  }
`;
