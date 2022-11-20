import { useMutation, useQuery } from '@apollo/client';
import {
  EMAIL_VERIFICATION_MUTATION,
  LOGIN_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  SEND_VERIFICATION_MAIL_MUTATION,
} from '../query/userQuery';
import {
  EmailVerificationMutation,
  EmailVerificationMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MeQueryVariables,
  RegisterMutation,
  RegisterMutationVariables,
  SendVerificationMailMutation,
  SendVerificationMailMutationVariables,
} from '../query/userQuery.generated';

export const useRegisterMutation = () =>
  useMutation<RegisterMutation, RegisterMutationVariables>(REGISTER_MUTATION);

export const useSendVerificationMailMutation = () =>
  useMutation<
    SendVerificationMailMutation,
    SendVerificationMailMutationVariables
  >(SEND_VERIFICATION_MAIL_MUTATION);

export const useEmailVerification = () =>
  useMutation<EmailVerificationMutation, EmailVerificationMutationVariables>(
    EMAIL_VERIFICATION_MUTATION
  );

export const useLoginMutation = () =>
  useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION);

export const useMeQuery = () => useQuery<MeQuery, MeQueryVariables>(ME_QUERY);
