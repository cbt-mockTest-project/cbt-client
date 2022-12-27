import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CHANGE_PASSWORD_AFTER_VERIFYING_MUTATION,
  CHECK_PASSWORD_MUTATION,
  DELETE_USER_MUTATION,
  EDIT_PROFILE_MUTATION,
  EMAIL_VERIFICATION_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  SEND_FIND_PASSWORD_MAIL_MUTATION,
  SEND_VERIFICATION_MAIL_MUTATION,
} from '../query/userQuery';
import {
  ChangePasswordAfterVerifyingMutation,
  ChangePasswordAfterVerifyingMutationVariables,
  CheckPasswordMutation,
  CheckPasswordMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  EditProfileMutation,
  EditProfileMutationVariables,
  EmailVerificationMutation,
  EmailVerificationMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  LogoutMutation,
  LogoutMutationVariables,
  MeQuery,
  MeQueryVariables,
  RegisterMutation,
  RegisterMutationVariables,
  SendFindPasswordMailMutation,
  SendFindPasswordMailMutationVariables,
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

export const useLogoutMutation = () =>
  useMutation<LogoutMutation, LogoutMutationVariables>(LOGOUT_MUTATION);

export const useEditProfileMutation = () =>
  useMutation<EditProfileMutation, EditProfileMutationVariables>(
    EDIT_PROFILE_MUTATION
  );

export const useCheckPasswordMutation = () =>
  useMutation<CheckPasswordMutation, CheckPasswordMutationVariables>(
    CHECK_PASSWORD_MUTATION
  );

export const useDeleteUser = () =>
  useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DELETE_USER_MUTATION
  );

export const useChangePasswordAfterVerifyingMutation = () =>
  useMutation<
    ChangePasswordAfterVerifyingMutation,
    ChangePasswordAfterVerifyingMutationVariables
  >(CHANGE_PASSWORD_AFTER_VERIFYING_MUTATION);

export const useSendFindPasswordMail = () =>
  useMutation<
    SendFindPasswordMailMutation,
    SendFindPasswordMailMutationVariables
  >(SEND_FIND_PASSWORD_MAIL_MUTATION);
