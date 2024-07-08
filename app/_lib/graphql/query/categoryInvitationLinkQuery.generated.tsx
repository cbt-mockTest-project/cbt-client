import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCategoryInvitationLinkMutationVariables = Types.Exact<{
  input: Types.CreateCategoryInvitationLinkInput;
}>;


export type CreateCategoryInvitationLinkMutation = { __typename?: 'Mutation', createCategoryInvitationLink: { __typename?: 'CreateCategoryInvitationLinkOutput', code?: string | null, error?: string | null, ok: boolean } };

export type ApproveCategoryInvitationLinkMutationVariables = Types.Exact<{
  input: Types.ApproveCategoryInvitationLinkInput;
}>;


export type ApproveCategoryInvitationLinkMutation = { __typename?: 'Mutation', approveCategoryInvitationLink: { __typename?: 'ApproveCategoryInvitationLinkOutput', error?: string | null, ok: boolean, categoryName?: string | null, urlSlug?: string | null } };


export const CreateCategoryInvitationLinkDocument = gql`
    mutation CreateCategoryInvitationLink($input: CreateCategoryInvitationLinkInput!) {
  createCategoryInvitationLink(input: $input) {
    code
    error
    ok
  }
}
    `;

export function useCreateCategoryInvitationLinkMutation() {
  return Urql.useMutation<CreateCategoryInvitationLinkMutation, CreateCategoryInvitationLinkMutationVariables>(CreateCategoryInvitationLinkDocument);
};
export const ApproveCategoryInvitationLinkDocument = gql`
    mutation ApproveCategoryInvitationLink($input: ApproveCategoryInvitationLinkInput!) {
  approveCategoryInvitationLink(input: $input) {
    error
    ok
    categoryName
    urlSlug
  }
}
    `;

export function useApproveCategoryInvitationLinkMutation() {
  return Urql.useMutation<ApproveCategoryInvitationLinkMutation, ApproveCategoryInvitationLinkMutationVariables>(ApproveCategoryInvitationLinkDocument);
};