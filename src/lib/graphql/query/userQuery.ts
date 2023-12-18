import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      error
      ok
    }
  }
`;

export const SEND_VERIFICATION_MAIL_MUTATION = gql`
  mutation sendVerificationMail($input: SendVerificationMailInput!) {
    sendVerificationMail(input: $input) {
      ok
      error
    }
  }
`;

export const EMAIL_VERIFICATION_MUTATION = gql`
  mutation EmailVerification($input: EmailVerificationInput!) {
    emailVerification(input: $input) {
      email
      error
      ok
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      error
      ok
      token
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      error
      ok
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      ok
      user {
        profileImg
        usedFreeTrial
        nickname
        id
        role
        email
        userRoles {
          role {
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

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      error
      ok
    }
  }
`;

export const CHECK_PASSWORD_MUTATION = gql`
  mutation CheckPassword($input: CheckPasswordInput!) {
    checkPassword(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser {
    deleteUser {
      error
      ok
    }
  }
`;

export const CHANGE_PASSWORD_AFTER_VERIFYING_MUTATION = gql`
  mutation ChangePasswordAfterVerifying(
    $input: ChangePasswordAfterVerifyingInput!
  ) {
    changePasswordAfterVerifying(input: $input) {
      error
      ok
    }
  }
`;

export const SEND_FIND_PASSWORD_MAIL_MUTATION = gql`
  mutation SendFindPasswordMail($input: SendFindPasswordMailInput!) {
    sendFindPasswordMail(input: $input) {
      error
      ok
    }
  }
`;

export const SEARCH_USER = gql`
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
export const UPDATE_ADBLOCK_PERMISSION = gql`
  mutation UpdateAdBlockPermission($input: UpdateAdblockPermissionInput!) {
    updateAdBlockPermission(input: $input) {
      adblockPermission
      error
      ok
    }
  }
`;

export const CHECK_USER_ROLE = gql`
  mutation CheckUserRole($input: CheckUserRoleInput!) {
    checkUserRole(input: $input) {
      confirmed
      error
      ok
    }
  }
`;

export const CHANGE_CLIENT_ROLE = gql`
  mutation ChangeClientRole($input: ChangeClientRoleInput!) {
    changeClientRole(input: $input) {
      error
      ok
    }
  }
`;

export const CREATE_USER_ROLE = gql`
  mutation CreateUserRole($input: CreateUserRoleInput!) {
    createUserRole(input: $input) {
      error
      ok
      roleId
    }
  }
`;

export const DELETE_USER_ROLE = gql`
  mutation DeleteUserRole($input: DeleteUserRoleInput!) {
    deleteUserRole(input: $input) {
      error
      ok
    }
  }
`;

export const CREATE_FREE_TRIAL = gql`
  mutation CreateFreeTrialRole {
    createFreeTrialRole {
      error
      ok
    }
  }
`;

export const GET_ROLE_COUNT = gql`
  query GetRoleCount($input: GetRoleCountInput!) {
    getRoleCount(input: $input) {
      count
      error
      ok
    }
  }
`;

export const GET_ROLES_COUNT = gql`
  query GetRolesCount($input: GetRolesCountInput!) {
    getRolesCount(input: $input) {
      count
      error
      ok
    }
  }
`;

export const GET_USER_BY_NICKNAME_OR_EMAIL = gql`
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

export const GET_USER = gql`
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
