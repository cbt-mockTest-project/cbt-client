import { gql } from '@apollo/client';

export const GET_PARTNERS = gql`
  query GetPartners {
    getPartners {
      error
      ok
      partners {
        id
      }
    }
  }
`;
