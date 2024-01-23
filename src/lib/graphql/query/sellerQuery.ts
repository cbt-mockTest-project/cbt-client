import { gql } from '@apollo/client';

export const GET_BUYERS = gql`
  query GetBuyers {
    getBuyers {
      ok
      error
      userAndRoles {
        price
        created_at
        role {
          name
        }
        user {
          nickname
          email
        }
      }
    }
  }
`;
