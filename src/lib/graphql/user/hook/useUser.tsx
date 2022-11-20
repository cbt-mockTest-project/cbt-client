import { useMutation } from '@apollo/client';
import {
  EMAIL_VERIFICATION_MUTATION,
  REGISTER_MUTATION,
  SEND_VERIFICATION_MAIL_MUTATION,
} from '../query/userQuery';
import {
  EmailVerificationMutation,
  EmailVerificationMutationVariables,
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
