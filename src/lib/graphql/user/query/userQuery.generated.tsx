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

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', nickname: string } };


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
export const MeDocument = gql`
    query Me {
  me {
    nickname
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};