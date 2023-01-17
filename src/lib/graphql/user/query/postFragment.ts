import { gql } from '@apollo/client';

export const FULL_POST_FRAGMENT = gql`
  fragment PostParts on Post {
    content
    created_at
    id
    title
    updated_at
    user {
      id
      nickname
    }
  }
`;
