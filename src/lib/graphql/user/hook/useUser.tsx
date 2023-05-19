import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CHANGE_CLIENT_ROLE,
  CHANGE_PASSWORD_AFTER_VERIFYING_MUTATION,
  CHECK_PASSWORD_MUTATION,
  CHECK_USER_ROLE,
  CREATE_USER_ROLE,
  DELETE_USER_MUTATION,
  EDIT_PROFILE_MUTATION,
  EMAIL_VERIFICATION_MUTATION,
  KAKAO_LOGIN,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  SEARCH_USER,
  SEND_FIND_PASSWORD_MAIL_MUTATION,
  SEND_VERIFICATION_MAIL_MUTATION,
  UPDATE_ADBLOCK_PERMISSION,
} from '../query/userQuery';
import {
  ChangeClientRoleMutation,
  ChangeClientRoleMutationVariables,
  ChangePasswordAfterVerifyingMutation,
  ChangePasswordAfterVerifyingMutationVariables,
  CheckPasswordMutation,
  CheckPasswordMutationVariables,
  CheckUserRoleMutation,
  CheckUserRoleMutationVariables,
  CreateUserRoleMutation,
  CreateUserRoleMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  EditProfileMutation,
  EditProfileMutationVariables,
  EmailVerificationMutation,
  EmailVerificationMutationVariables,
  KakaoLoginMutation,
  KakaoLoginMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  LogoutMutation,
  LogoutMutationVariables,
  MeQuery,
  MeQueryVariables,
  RegisterMutation,
  RegisterMutationVariables,
  SearchUserQuery,
  SearchUserQueryVariables,
  SendFindPasswordMailMutation,
  SendFindPasswordMailMutationVariables,
  SendVerificationMailMutation,
  SendVerificationMailMutationVariables,
  UpdateAdBlockPermissionMutation,
  UpdateAdBlockPermissionMutationVariables,
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

export const useLazyMeQuery = () =>
  useLazyQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
    fetchPolicy: 'network-only',
  });

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

export const useKakaoLogin = () =>
  useMutation<KakaoLoginMutation, KakaoLoginMutationVariables>(KAKAO_LOGIN);

export const useLazySearchUser = () =>
  useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SEARCH_USER, {
    fetchPolicy: 'network-only',
  });

export const useUpdateAdblockPermission = () =>
  useMutation<
    UpdateAdBlockPermissionMutation,
    UpdateAdBlockPermissionMutationVariables
  >(UPDATE_ADBLOCK_PERMISSION);

export const useCheckUserRole = () =>
  useMutation<CheckUserRoleMutation, CheckUserRoleMutationVariables>(
    CHECK_USER_ROLE
  );

export const useChangeClientRole = () =>
  useMutation<ChangeClientRoleMutation, ChangeClientRoleMutationVariables>(
    CHANGE_CLIENT_ROLE
  );

export const useCreateUserRole = () =>
  useMutation<CreateUserRoleMutation, CreateUserRoleMutationVariables>(
    CREATE_USER_ROLE
  );

export const useDeleteUserRole = () =>
  useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DELETE_USER_MUTATION
  );
