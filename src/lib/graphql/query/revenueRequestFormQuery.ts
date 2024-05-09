import { gql } from '@apollo/client';

export const CREATE_REVENUE_REQUEST_FORM_MUTATION = gql`
  mutation CreateRevenueRequestForm($input: CreateRevenueRequestFormInput!) {
    createRevenueRequestForm(input: $input) {
      ok
      error
      revenueRequestForm {
        id
        status
        reason
      }
    }
  }
`;
