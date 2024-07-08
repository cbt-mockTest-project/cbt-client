import { gql } from '@apollo/client';

export const CREATE_CATEGORY_INVITATION = gql`
  mutation CreateExamCategoryInvitation(
    $input: CreateExamCategoryInvitationInput!
  ) {
    createExamCategoryInvitation(input: $input) {
      error
      ok
    }
  }
`;

export const GET_CATEGORY_INVITATION = gql`
  query GetExamCategoryInvitations {
    getExamCategoryInvitations {
      error
      invitations {
        id
        category {
          id
          name
          user {
            id
            email
            nickname
            profileImg
          }
        }
      }
      ok
    }
  }
`;

export const DELETE_CATEGORY_INVITATION = gql`
  mutation DeleteExamCategoryInvitation(
    $input: DeleteExamCategoryInvitationInput!
  ) {
    deleteExamCategoryInvitation(input: $input) {
      error
      ok
    }
  }
`;

export const ACCEPT_CATEGORY_INVITATION = gql`
  mutation AcceptExamCategoryInvitation(
    $input: AcceptExamCategoryInvitationInput!
  ) {
    acceptExamCategoryInvitation(input: $input) {
      error
      ok
    }
  }
`;
