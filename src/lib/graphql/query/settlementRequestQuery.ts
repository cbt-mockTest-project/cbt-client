import { gql } from '@apollo/client';

export const CREATE_SETTLEMENT_REQUEST = gql`
  mutation CreateSettlementRequest($input: CreateSettlementRequestInput!) {
    createSettlementRequest(input: $input) {
      error
      ok
    }
  }
`;

export const GET_SETTLEMENT_REQUESTS = gql`
  query GetSettlementRequests {
    getSettlementRequests {
      error
      ok
      settlementRequests {
        accountHolder
        accountNumber
        amount
        bankName
        created_at
        id
        status
        updated_at
        user {
          email
          id
          nickname
        }
      }
    }
  }
`;

export const GET_MY_SETTLEMENT_REQUEST = gql`
  query GetMySettlementRequest {
    getMySettlementRequest {
      error
      ok
      settlementRequest {
        accountHolder
        accountNumber
        amount
        bankName
        created_at
        id
        status
        updated_at
      }
    }
  }
`;

export const GET_MY_SETTLEMENT_REQUESTS = gql`
  query GetMySettlementRequests {
    getMySettlementRequests {
      error
      ok
      settlementRequests {
        accountHolder
        accountNumber
        amount
        bankName
        created_at
        id
        status
        updated_at
      }
    }
  }
`;

export const UPDATE_SETTLEMENT_REQUEST = gql`
  mutation UpdateSettlementRequest($input: UpdateSettlementRequestInput!) {
    updateSettlementRequest(input: $input) {
      error
      ok
    }
  }
`;
