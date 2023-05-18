import { gql } from '@apollo/client';

export const CHANGE_CLIENT_ROLE_AND_CREATE_PAYMENT = gql`
  mutation ChangeClientRoleAndCreatePayment(
    $input: ChangeClientRoleAndCreatePaymentInput!
  ) {
    changeClientRoleAndCreatePayment(input: $input) {
      error
      ok
      paymentId
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
      error
      ok
    }
  }
`;
