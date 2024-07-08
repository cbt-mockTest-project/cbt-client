import { gql } from '@apollo/client';

export const GET_BUYERS = gql`
  query GetBuyers {
    getBuyers {
      ok
      error
      userAndRoles {
        id
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
