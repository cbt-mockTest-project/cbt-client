import { gql } from '@apollo/client';

export const CREATE_CATEGORY_INVITATION_LINK = gql`
  mutation CreateCategoryInvitationLink(
    $input: CreateCategoryInvitationLinkInput!
  ) {
    createCategoryInvitationLink(input: $input) {
      code
      error
      ok
    }
  }
`;

export const APPROVE_CATEGORY_INVITATION_LINK = gql`
  mutation ApproveCategoryInvitationLink(
    $input: ApproveCategoryInvitationLinkInput!
  ) {
    approveCategoryInvitationLink(input: $input) {
      error
      ok
      categoryName
      urlSlug
      examType
    }
  }
`;
