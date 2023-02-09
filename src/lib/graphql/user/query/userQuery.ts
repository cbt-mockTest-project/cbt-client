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
        nickname
        id
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

export const KAKAO_LOGIN = gql`
  mutation KakaoLogin($input: KakaoLoginInput!) {
    kakaoLogin(input: $input) {
      error
      ok
    }
  }
`;
