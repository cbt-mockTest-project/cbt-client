import { gql } from '@apollo/client';

export const EDIT_POST_QUERY = gql`
  mutation EditPostLike($input: EditPostLikeInput!) {
    editPostLike(input: $input) {
      currentState
      error
      ok
    }
  }
`;
