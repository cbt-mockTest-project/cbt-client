import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateExamCategoryInvitationMutationVariables = Types.Exact<{
  input: Types.CreateExamCategoryInvitationInput;
}>;


export type CreateExamCategoryInvitationMutation = { __typename?: 'Mutation', createExamCategoryInvitation: { __typename?: 'CreateExamCategoryInvitationOutput', error?: string | null, ok: boolean } };

export type GetExamCategoryInvitationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetExamCategoryInvitationsQuery = { __typename?: 'Query', getExamCategoryInvitations: { __typename?: 'GetExamCategoryInvitationsOutput', error?: string | null, ok: boolean, invitations?: Array<{ __typename?: 'ExamCategoryInvitation', id: number, user: { __typename?: 'User', id: number, email: string, nickname: string } }> | null } };

export type DeleteExamCategoryInvitationMutationVariables = Types.Exact<{
  input: Types.DeleteExamCategoryInvitationInput;
}>;


export type DeleteExamCategoryInvitationMutation = { __typename?: 'Mutation', deleteExamCategoryInvitation: { __typename?: 'DeleteExamCategoryInvitationOutput', error?: string | null, ok: boolean } };

export type AcceptExamCategoryInvitationMutationVariables = Types.Exact<{
  input: Types.AcceptExamCategoryInvitationInput;
}>;


export type AcceptExamCategoryInvitationMutation = { __typename?: 'Mutation', acceptExamCategoryInvitation: { __typename?: 'AcceptExamCategoryInvitationOutput', error?: string | null, ok: boolean } };


export const CreateExamCategoryInvitationDocument = gql`
    mutation CreateExamCategoryInvitation($input: CreateExamCategoryInvitationInput!) {
  createExamCategoryInvitation(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateExamCategoryInvitationMutation() {
  return Urql.useMutation<CreateExamCategoryInvitationMutation, CreateExamCategoryInvitationMutationVariables>(CreateExamCategoryInvitationDocument);
};
export const GetExamCategoryInvitationsDocument = gql`
    query GetExamCategoryInvitations {
  getExamCategoryInvitations {
    error
    invitations {
      id
      user {
        id
        email
        nickname
      }
    }
    ok
  }
}
    `;

export function useGetExamCategoryInvitationsQuery(options?: Omit<Urql.UseQueryArgs<GetExamCategoryInvitationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamCategoryInvitationsQuery, GetExamCategoryInvitationsQueryVariables>({ query: GetExamCategoryInvitationsDocument, ...options });
};
export const DeleteExamCategoryInvitationDocument = gql`
    mutation DeleteExamCategoryInvitation($input: DeleteExamCategoryInvitationInput!) {
  deleteExamCategoryInvitation(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteExamCategoryInvitationMutation() {
  return Urql.useMutation<DeleteExamCategoryInvitationMutation, DeleteExamCategoryInvitationMutationVariables>(DeleteExamCategoryInvitationDocument);
};
export const AcceptExamCategoryInvitationDocument = gql`
    mutation AcceptExamCategoryInvitation($input: AcceptExamCategoryInvitationInput!) {
  acceptExamCategoryInvitation(input: $input) {
    error
    ok
  }
}
    `;

export function useAcceptExamCategoryInvitationMutation() {
  return Urql.useMutation<AcceptExamCategoryInvitationMutation, AcceptExamCategoryInvitationMutationVariables>(AcceptExamCategoryInvitationDocument);
};