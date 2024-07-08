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

export const GET_REVENUE_REQUEST_FORMS_QUERY = gql`
  query GetRevenueRequestForms {
    getRevenueRequestForms {
      error
      ok
      revenueRequestForms {
        category {
          id
          urlSlug
          user {
            email
            id
          }
        }
        created_at
        id
        reason
        status
      }
    }
  }
`;

export const UPDATE_REVENUE_REQUEST_FORM_MUTATION = gql`
  mutation UpdateRevenueRequestForm($input: UpdateRevenueRequestFormInput!) {
    updateRevenueRequestForm(input: $input) {
      error
      ok
    }
  }
`;
