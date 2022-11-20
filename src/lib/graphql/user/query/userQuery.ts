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

export const ME_QUERY = gql`
  query Me {
    me {
      nickname
    }
  }
`;
