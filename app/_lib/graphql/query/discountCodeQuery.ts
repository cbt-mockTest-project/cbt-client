import { gql } from '@apollo/client';

export const CHECK_DISCOUNT_CODE = gql`
  mutation CheckDiscountCode($input: CheckDiscountCodeInput!) {
    checkDiscountCode(input: $input) {
      error
      ok
    }
  }
`;

export const UPDATE_DISCOUNT_CODE = gql`
  mutation UpdateDiscountCode($input: UpdateDiscountCodeInput!) {
    updateDiscountCode(input: $input) {
      error
      ok
    }
  }
`;
