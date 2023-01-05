import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RegisterMutationVariables = Types.Exact<{
  input: Types.RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterOutput', error?: string | null, ok: boolean } };

export type SendVerificationMailMutationVariables = Types.Exact<{
  input: Types.SendVerificationMailInput;
}>;


export type SendVerificationMailMutation = { __typename?: 'Mutation', sendVerificationMail: { __typename?: 'SendVerificationMailOutput', ok: boolean, error?: string | null } };

export type EmailVerificationMutationVariables = Types.Exact<{
  input: Types.EmailVerificationInput;
}>;


export type EmailVerificationMutation = { __typename?: 'Mutation', emailVerification: { __typename?: 'EmailVerificationOutput', email: string, error?: string | null, ok: boolean } };

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', error?: string | null, ok: boolean, token?: string | null } };

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'CoreOutput', error?: string | null, ok: boolean } };

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', nickname: string, id: number } | null } };

export type EditProfileMutationVariables = Types.Exact<{
  input: Types.EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutput', error?: string | null, ok: boolean } };

export type CheckPasswordMutationVariables = Types.Exact<{
  input: Types.CheckPasswordInput;
}>;


export type CheckPasswordMutation = { __typename?: 'Mutation', checkPassword: { __typename?: 'CheckPasswordOutput', error?: string | null, ok: boolean } };

export type DeleteUserMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'CoreOutput', error?: string | null, ok: boolean } };

export type ChangePasswordAfterVerifyingMutationVariables = Types.Exact<{
  input: Types.ChangePasswordAfterVerifyingInput;
}>;


export type ChangePasswordAfterVerifyingMutation = { __typename?: 'Mutation', changePasswordAfterVerifying: { __typename?: 'ChangePasswordAfterVerifyingOutput', error?: string | null, ok: boolean } };

export type SendFindPasswordMailMutationVariables = Types.Exact<{
  input: Types.SendFindPasswordMailInput;
}>;


export type SendFindPasswordMailMutation = { __typename?: 'Mutation', sendFindPasswordMail: { __typename?: 'SendFindPasswordMailOutput', error?: string | null, ok: boolean } };


export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    error
    ok
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendVerificationMailDocument = gql`
    mutation sendVerificationMail($input: SendVerificationMailInput!) {
  sendVerificationMail(input: $input) {
    ok
    error
  }
}
    `;

export function useSendVerificationMailMutation() {
  return Urql.useMutation<SendVerificationMailMutation, SendVerificationMailMutationVariables>(SendVerificationMailDocument);
};
export const EmailVerificationDocument = gql`
    mutation EmailVerification($input: EmailVerificationInput!) {
  emailVerification(input: $input) {
    email
    error
    ok
  }
}
    `;

export function useEmailVerificationMutation() {
  return Urql.useMutation<EmailVerificationMutation, EmailVerificationMutationVariables>(EmailVerificationDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    error
    ok
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    error
    ok
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ok
    user {
      nickname
      id
    }
    error
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const EditProfileDocument = gql`
    mutation EditProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    error
    ok
  }
}
    `;

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument);
};
export const CheckPasswordDocument = gql`
    mutation CheckPassword($input: CheckPasswordInput!) {
  checkPassword(input: $input) {
    error
    ok
  }
}
    `;

export function useCheckPasswordMutation() {
  return Urql.useMutation<CheckPasswordMutation, CheckPasswordMutationVariables>(CheckPasswordDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser {
    error
    ok
  }
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const ChangePasswordAfterVerifyingDocument = gql`
    mutation ChangePasswordAfterVerifying($input: ChangePasswordAfterVerifyingInput!) {
  changePasswordAfterVerifying(input: $input) {
    error
    ok
  }
}
    `;

export function useChangePasswordAfterVerifyingMutation() {
  return Urql.useMutation<ChangePasswordAfterVerifyingMutation, ChangePasswordAfterVerifyingMutationVariables>(ChangePasswordAfterVerifyingDocument);
};
export const SendFindPasswordMailDocument = gql`
    mutation SendFindPasswordMail($input: SendFindPasswordMailInput!) {
  sendFindPasswordMail(input: $input) {
    error
    ok
  }
}
    `;

export function useSendFindPasswordMailMutation() {
  return Urql.useMutation<SendFindPasswordMailMutation, SendFindPasswordMailMutationVariables>(SendFindPasswordMailDocument);
};