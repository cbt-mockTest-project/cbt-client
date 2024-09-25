import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RegisterMutationVariables = Types.Exact<{
  input: Types.RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'RegisterOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type SendVerificationMailMutationVariables = Types.Exact<{
  input: Types.SendVerificationMailInput;
}>;

export type SendVerificationMailMutation = {
  __typename?: 'Mutation';
  sendVerificationMail: {
    __typename?: 'SendVerificationMailOutput';
    ok: boolean;
    error?: string | null;
  };
};

export type EmailVerificationMutationVariables = Types.Exact<{
  input: Types.EmailVerificationInput;
}>;

export type EmailVerificationMutation = {
  __typename?: 'Mutation';
  emailVerification: {
    __typename?: 'EmailVerificationOutput';
    email: string;
    error?: string | null;
    ok: boolean;
  };
};

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginOutput';
    error?: string | null;
    ok: boolean;
    token?: string | null;
  };
};

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout: { __typename?: 'CoreOutput'; error?: string | null; ok: boolean };
};

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'MeOutput';
    ok: boolean;
    error?: string | null;
    user?: {
      __typename?: 'User';
      hasBookmarkedBefore?: boolean | null;
      randomExamLimit?: number | null;
      printLimit?: number | null;
      hasSolvedBefore?: boolean | null;
      solveLimit?: number | null;
      profileImg: string;
      usedFreeTrial: boolean;
      nickname: string;
      id: number;
      role: Types.UserRole;
      email: string;
      recentlyStudiedCategory: string;
      recentlyStudiedExams?: Array<{
        __typename?: 'RecentlyStudiedExams';
        examIds: Array<number>;
        categoryId: number;
        questionIndex: number;
      }> | null;
      userRoles: Array<{
        __typename?: 'UserAndRole';
        created_at: any;
        role: {
          __typename?: 'Role';
          period?: number | null;
          endDate?: string | null;
          name: string;
          id: number;
        };
      }>;
    } | null;
    notices?: Array<{
      __typename?: 'Notice';
      content: string;
      id: number;
      created_at: any;
      confirm: boolean;
      link?: string | null;
    }> | null;
  };
};

export type EditProfileMutationVariables = Types.Exact<{
  input: Types.EditProfileInput;
}>;

export type EditProfileMutation = {
  __typename?: 'Mutation';
  editProfile: {
    __typename?: 'EditProfileOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type CheckPasswordMutationVariables = Types.Exact<{
  input: Types.CheckPasswordInput;
}>;

export type CheckPasswordMutation = {
  __typename?: 'Mutation';
  checkPassword: {
    __typename?: 'CheckPasswordOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type DeleteUserMutationVariables = Types.Exact<{ [key: string]: never }>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser: { __typename?: 'CoreOutput'; error?: string | null; ok: boolean };
};

export type ChangePasswordAfterVerifyingMutationVariables = Types.Exact<{
  input: Types.ChangePasswordAfterVerifyingInput;
}>;

export type ChangePasswordAfterVerifyingMutation = {
  __typename?: 'Mutation';
  changePasswordAfterVerifying: {
    __typename?: 'ChangePasswordAfterVerifyingOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type SendFindPasswordMailMutationVariables = Types.Exact<{
  input: Types.SendFindPasswordMailInput;
}>;

export type SendFindPasswordMailMutation = {
  __typename?: 'Mutation';
  sendFindPasswordMail: {
    __typename?: 'SendFindPasswordMailOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type SearchUserQueryVariables = Types.Exact<{
  input: Types.SearchUserInput;
}>;

export type SearchUserQuery = {
  __typename?: 'Query';
  searchUser: {
    __typename?: 'SearchUserOutput';
    error?: string | null;
    ok: boolean;
    users?: Array<{
      __typename?: 'User';
      id: number;
      email: string;
      nickname: string;
      userRoles: Array<{
        __typename?: 'UserAndRole';
        role: { __typename?: 'Role'; id: number; name: string };
      }>;
    }> | null;
  };
};

export type UpdateAdBlockPermissionMutationVariables = Types.Exact<{
  input: Types.UpdateAdblockPermissionInput;
}>;

export type UpdateAdBlockPermissionMutation = {
  __typename?: 'Mutation';
  updateAdBlockPermission: {
    __typename?: 'UpdateAdblockPermissionOutput';
    adblockPermission?: boolean | null;
    error?: string | null;
    ok: boolean;
  };
};

export type CheckUserRoleMutationVariables = Types.Exact<{
  input: Types.CheckUserRoleInput;
}>;

export type CheckUserRoleMutation = {
  __typename?: 'Mutation';
  checkUserRole: {
    __typename?: 'CheckUserRoleOutput';
    confirmed: boolean;
    error?: string | null;
    ok: boolean;
  };
};

export type ChangeClientRoleMutationVariables = Types.Exact<{
  input: Types.ChangeClientRoleInput;
}>;

export type ChangeClientRoleMutation = {
  __typename?: 'Mutation';
  changeClientRole: {
    __typename?: 'CoreOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type CreateUserRoleMutationVariables = Types.Exact<{
  input: Types.CreateUserRoleInput;
}>;

export type CreateUserRoleMutation = {
  __typename?: 'Mutation';
  createUserRole: {
    __typename?: 'CreateUserRoleOutput';
    error?: string | null;
    ok: boolean;
    roleId?: number | null;
  };
};

export type DeleteUserRoleMutationVariables = Types.Exact<{
  input: Types.DeleteUserRoleInput;
}>;

export type DeleteUserRoleMutation = {
  __typename?: 'Mutation';
  deleteUserRole: {
    __typename?: 'DeleteUserRoleOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type CreateFreeTrialRoleMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type CreateFreeTrialRoleMutation = {
  __typename?: 'Mutation';
  createFreeTrialRole: {
    __typename?: 'CreateFreeTrialRoleOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type GetRoleCountQueryVariables = Types.Exact<{
  input: Types.GetRoleCountInput;
}>;

export type GetRoleCountQuery = {
  __typename?: 'Query';
  getRoleCount: {
    __typename?: 'GetRoleCountOutput';
    count?: number | null;
    error?: string | null;
    ok: boolean;
  };
};

export type GetRolesCountQueryVariables = Types.Exact<{
  input: Types.GetRolesCountInput;
}>;

export type GetRolesCountQuery = {
  __typename?: 'Query';
  getRolesCount: {
    __typename?: 'GetRolesCountOutput';
    count?: number | null;
    error?: string | null;
    ok: boolean;
  };
};

export type GetUserByNicknameOrEmailQueryVariables = Types.Exact<{
  input: Types.GetUserByNicknameOrEmailInput;
}>;

export type GetUserByNicknameOrEmailQuery = {
  __typename?: 'Query';
  getUserByNicknameOrEmail: {
    __typename?: 'GetUserByNicknameOrEmailOutput';
    ok: boolean;
    error?: string | null;
    user?: {
      __typename?: 'User';
      id: number;
      email: string;
      nickname: string;
    } | null;
  };
};

export type UserProfileQueryVariables = Types.Exact<{
  input: Types.UserProfileInput;
}>;

export type UserProfileQuery = {
  __typename?: 'Query';
  userProfile: {
    __typename?: 'UserProfileOutput';
    error?: string | null;
    ok: boolean;
    user?: {
      __typename?: 'User';
      id: number;
      profileImg: string;
      nickname: string;
    } | null;
  };
};

export type UpdateRecentlyStudiedCategoryMutationVariables = Types.Exact<{
  input: Types.UpdateRecentlyStudiedCategoryInput;
}>;

export type UpdateRecentlyStudiedCategoryMutation = {
  __typename?: 'Mutation';
  updateRecentlyStudiedCategory: {
    __typename?: 'UpdateRecentlyStudiedCategoryOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type UpsertRecentlyStudiedExamsMutationVariables = Types.Exact<{
  input: Types.UpsertRecentlyStudiedExamsInput;
}>;

export type UpsertRecentlyStudiedExamsMutation = {
  __typename?: 'Mutation';
  upsertRecentlyStudiedExams: {
    __typename?: 'UpsertRecentlyStudiedExamsOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type DeleteRecentlyStudiedExamsMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type DeleteRecentlyStudiedExamsMutation = {
  __typename?: 'Mutation';
  deleteRecentlyStudiedExams: {
    __typename?: 'CoreOutput';
    error?: string | null;
    ok: boolean;
  };
};

export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      error
      ok
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const SendVerificationMailDocument = gql`
  mutation sendVerificationMail($input: SendVerificationMailInput!) {
    sendVerificationMail(input: $input) {
      ok
      error
    }
  }
`;

export function useSendVerificationMailMutation() {
  return Urql.useMutation<
    SendVerificationMailMutation,
    SendVerificationMailMutationVariables
  >(SendVerificationMailDocument);
}
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
  return Urql.useMutation<
    EmailVerificationMutation,
    EmailVerificationMutationVariables
  >(EmailVerificationDocument);
}
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
}
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      error
      ok
    }
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ok
      user {
        hasBookmarkedBefore
        randomExamLimit
        printLimit
        hasSolvedBefore
        solveLimit
        profileImg
        usedFreeTrial
        nickname
        id
        role
        email
        recentlyStudiedCategory
        recentlyStudiedExams {
          examIds
          categoryId
          questionIndex
        }
        userRoles {
          created_at
          role {
            period
            endDate
            name
            id
          }
        }
      }
      notices {
        content
        id
        created_at
        confirm
        link
      }
      error
    }
  }
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
export const EditProfileDocument = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      error
      ok
    }
  }
`;

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(
    EditProfileDocument
  );
}
export const CheckPasswordDocument = gql`
  mutation CheckPassword($input: CheckPasswordInput!) {
    checkPassword(input: $input) {
      error
      ok
    }
  }
`;

export function useCheckPasswordMutation() {
  return Urql.useMutation<
    CheckPasswordMutation,
    CheckPasswordMutationVariables
  >(CheckPasswordDocument);
}
export const DeleteUserDocument = gql`
  mutation DeleteUser {
    deleteUser {
      error
      ok
    }
  }
`;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument
  );
}
export const ChangePasswordAfterVerifyingDocument = gql`
  mutation ChangePasswordAfterVerifying(
    $input: ChangePasswordAfterVerifyingInput!
  ) {
    changePasswordAfterVerifying(input: $input) {
      error
      ok
    }
  }
`;

export function useChangePasswordAfterVerifyingMutation() {
  return Urql.useMutation<
    ChangePasswordAfterVerifyingMutation,
    ChangePasswordAfterVerifyingMutationVariables
  >(ChangePasswordAfterVerifyingDocument);
}
export const SendFindPasswordMailDocument = gql`
  mutation SendFindPasswordMail($input: SendFindPasswordMailInput!) {
    sendFindPasswordMail(input: $input) {
      error
      ok
    }
  }
`;

export function useSendFindPasswordMailMutation() {
  return Urql.useMutation<
    SendFindPasswordMailMutation,
    SendFindPasswordMailMutationVariables
  >(SendFindPasswordMailDocument);
}
export const SearchUserDocument = gql`
  query SearchUser($input: SearchUserInput!) {
    searchUser(input: $input) {
      error
      ok
      users {
        id
        email
        nickname
        userRoles {
          role {
            id
            name
          }
        }
      }
    }
  }
`;

export function useSearchUserQuery(
  options: Omit<Urql.UseQueryArgs<SearchUserQueryVariables>, 'query'>
) {
  return Urql.useQuery<SearchUserQuery, SearchUserQueryVariables>({
    query: SearchUserDocument,
    ...options,
  });
}
export const UpdateAdBlockPermissionDocument = gql`
  mutation UpdateAdBlockPermission($input: UpdateAdblockPermissionInput!) {
    updateAdBlockPermission(input: $input) {
      adblockPermission
      error
      ok
    }
  }
`;

export function useUpdateAdBlockPermissionMutation() {
  return Urql.useMutation<
    UpdateAdBlockPermissionMutation,
    UpdateAdBlockPermissionMutationVariables
  >(UpdateAdBlockPermissionDocument);
}
export const CheckUserRoleDocument = gql`
  mutation CheckUserRole($input: CheckUserRoleInput!) {
    checkUserRole(input: $input) {
      confirmed
      error
      ok
    }
  }
`;

export function useCheckUserRoleMutation() {
  return Urql.useMutation<
    CheckUserRoleMutation,
    CheckUserRoleMutationVariables
  >(CheckUserRoleDocument);
}
export const ChangeClientRoleDocument = gql`
  mutation ChangeClientRole($input: ChangeClientRoleInput!) {
    changeClientRole(input: $input) {
      error
      ok
    }
  }
`;

export function useChangeClientRoleMutation() {
  return Urql.useMutation<
    ChangeClientRoleMutation,
    ChangeClientRoleMutationVariables
  >(ChangeClientRoleDocument);
}
export const CreateUserRoleDocument = gql`
  mutation CreateUserRole($input: CreateUserRoleInput!) {
    createUserRole(input: $input) {
      error
      ok
      roleId
    }
  }
`;

export function useCreateUserRoleMutation() {
  return Urql.useMutation<
    CreateUserRoleMutation,
    CreateUserRoleMutationVariables
  >(CreateUserRoleDocument);
}
export const DeleteUserRoleDocument = gql`
  mutation DeleteUserRole($input: DeleteUserRoleInput!) {
    deleteUserRole(input: $input) {
      error
      ok
    }
  }
`;

export function useDeleteUserRoleMutation() {
  return Urql.useMutation<
    DeleteUserRoleMutation,
    DeleteUserRoleMutationVariables
  >(DeleteUserRoleDocument);
}
export const CreateFreeTrialRoleDocument = gql`
  mutation CreateFreeTrialRole {
    createFreeTrialRole {
      error
      ok
    }
  }
`;

export function useCreateFreeTrialRoleMutation() {
  return Urql.useMutation<
    CreateFreeTrialRoleMutation,
    CreateFreeTrialRoleMutationVariables
  >(CreateFreeTrialRoleDocument);
}
export const GetRoleCountDocument = gql`
  query GetRoleCount($input: GetRoleCountInput!) {
    getRoleCount(input: $input) {
      count
      error
      ok
    }
  }
`;

export function useGetRoleCountQuery(
  options: Omit<Urql.UseQueryArgs<GetRoleCountQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetRoleCountQuery, GetRoleCountQueryVariables>({
    query: GetRoleCountDocument,
    ...options,
  });
}
export const GetRolesCountDocument = gql`
  query GetRolesCount($input: GetRolesCountInput!) {
    getRolesCount(input: $input) {
      count
      error
      ok
    }
  }
`;

export function useGetRolesCountQuery(
  options: Omit<Urql.UseQueryArgs<GetRolesCountQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetRolesCountQuery, GetRolesCountQueryVariables>({
    query: GetRolesCountDocument,
    ...options,
  });
}
export const GetUserByNicknameOrEmailDocument = gql`
  query GetUserByNicknameOrEmail($input: GetUserByNicknameOrEmailInput!) {
    getUserByNicknameOrEmail(input: $input) {
      ok
      error
      user {
        id
        email
        nickname
      }
    }
  }
`;

export function useGetUserByNicknameOrEmailQuery(
  options: Omit<
    Urql.UseQueryArgs<GetUserByNicknameOrEmailQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetUserByNicknameOrEmailQuery,
    GetUserByNicknameOrEmailQueryVariables
  >({ query: GetUserByNicknameOrEmailDocument, ...options });
}
export const UserProfileDocument = gql`
  query UserProfile($input: UserProfileInput!) {
    userProfile(input: $input) {
      error
      ok
      user {
        id
        profileImg
        nickname
      }
    }
  }
`;

export function useUserProfileQuery(
  options: Omit<Urql.UseQueryArgs<UserProfileQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserProfileQuery, UserProfileQueryVariables>({
    query: UserProfileDocument,
    ...options,
  });
}
export const UpdateRecentlyStudiedCategoryDocument = gql`
  mutation UpdateRecentlyStudiedCategory(
    $input: UpdateRecentlyStudiedCategoryInput!
  ) {
    updateRecentlyStudiedCategory(input: $input) {
      error
      ok
    }
  }
`;

export function useUpdateRecentlyStudiedCategoryMutation() {
  return Urql.useMutation<
    UpdateRecentlyStudiedCategoryMutation,
    UpdateRecentlyStudiedCategoryMutationVariables
  >(UpdateRecentlyStudiedCategoryDocument);
}
export const UpsertRecentlyStudiedExamsDocument = gql`
  mutation UpsertRecentlyStudiedExams(
    $input: UpsertRecentlyStudiedExamsInput!
  ) {
    upsertRecentlyStudiedExams(input: $input) {
      error
      ok
    }
  }
`;

export function useUpsertRecentlyStudiedExamsMutation() {
  return Urql.useMutation<
    UpsertRecentlyStudiedExamsMutation,
    UpsertRecentlyStudiedExamsMutationVariables
  >(UpsertRecentlyStudiedExamsDocument);
}
export const DeleteRecentlyStudiedExamsDocument = gql`
  mutation DeleteRecentlyStudiedExams {
    deleteRecentlyStudiedExams {
      error
      ok
    }
  }
`;

export function useDeleteRecentlyStudiedExamsMutation() {
  return Urql.useMutation<
    DeleteRecentlyStudiedExamsMutation,
    DeleteRecentlyStudiedExamsMutationVariables
  >(DeleteRecentlyStudiedExamsDocument);
}
