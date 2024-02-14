import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CHANGE_CLIENT_ROLE,
  CHANGE_PASSWORD_AFTER_VERIFYING_MUTATION,
  CHECK_PASSWORD_MUTATION,
  CHECK_USER_ROLE,
  CREATE_FREE_TRIAL,
  CREATE_USER_ROLE,
  DELETE_USER_MUTATION,
  DELETE_USER_ROLE,
  EDIT_PROFILE_MUTATION,
  EMAIL_VERIFICATION_MUTATION,
  GET_ROLES_COUNT,
  GET_ROLE_COUNT,
  GET_USER_BY_NICKNAME_OR_EMAIL,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  SEARCH_USER,
  SEND_FIND_PASSWORD_MAIL_MUTATION,
  SEND_VERIFICATION_MAIL_MUTATION,
  UPDATE_ADBLOCK_PERMISSION,
  UPDATE_RECENTLY_STUDIED_CATEGORY,
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
  CreateFreeTrialRoleMutation,
  CreateFreeTrialRoleMutationVariables,
  CreateUserRoleMutation,
  CreateUserRoleMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  DeleteUserRoleMutation,
  DeleteUserRoleMutationVariables,
  EditProfileMutation,
  EditProfileMutationVariables,
  EmailVerificationMutation,
  EmailVerificationMutationVariables,
  GetRoleCountQuery,
  GetRoleCountQueryVariables,
  GetRolesCountQuery,
  GetRolesCountQueryVariables,
  GetUserByNicknameOrEmailQuery,
  GetUserByNicknameOrEmailQueryVariables,
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
  UpdateRecentlyStudiedCategoryMutation,
  UpdateRecentlyStudiedCategoryMutationVariables,
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
  useMutation<DeleteUserRoleMutation, DeleteUserRoleMutationVariables>(
    DELETE_USER_ROLE
  );

export const useCreateFreeTrial = () =>
  useMutation<
    CreateFreeTrialRoleMutation,
    CreateFreeTrialRoleMutationVariables
  >(CREATE_FREE_TRIAL);

export const useLazyGetRoleCount = () =>
  useLazyQuery<GetRoleCountQuery, GetRoleCountQueryVariables>(GET_ROLE_COUNT);

export const useLazyGetRolesCount = () =>
  useLazyQuery<GetRolesCountQuery, GetRolesCountQueryVariables>(
    GET_ROLES_COUNT
  );

export const useLazyGetUser = () =>
  useLazyQuery<
    GetUserByNicknameOrEmailQuery,
    GetUserByNicknameOrEmailQueryVariables
  >(GET_USER_BY_NICKNAME_OR_EMAIL);

export const useUpdateRecentlyStudiedCategory = () =>
  useMutation<
    UpdateRecentlyStudiedCategoryMutation,
    UpdateRecentlyStudiedCategoryMutationVariables
  >(UPDATE_RECENTLY_STUDIED_CATEGORY);
