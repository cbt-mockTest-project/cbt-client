import React, { useEffect, useState } from 'react';
import palette from '@styles/palette';
import { App, Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginInput } from 'types';
import ErrorText from '../layout/errorText/ErrorText';
import { useLoginMutation } from '@lib/graphql/hook/useUser';
import GoogleIconSVG from '@mui/icons-material/Google';
import KakaoIconSVG from '@assets/svg/kakao.svg';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API,
} from '@lib/constants';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

interface LoginFormProps {
  isMobile?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isMobile = false }) => {
  const { message } = App.useApp();
  const { control, formState, handleSubmit } = useForm<LoginInput>();
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [buttonState, setButtonState] = useState(false);
  const onKakaoAuth = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };
  const onGoogleAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  };

  useEffect(() => {
    if (router.asPath === '/auth' || !router.asPath) return;
    setCookie('auth_redirect', router.asPath, {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      path: '/',
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });
  }, [router.asPath]);
  const onSubmit = async (data: LoginInput) => {
    setButtonState(true);
    const res = await loginMutation({ variables: { input: data } });
    if (res.data) {
      const { login } = res.data;
      if (login.error) {
        setButtonState(false);
        return message.error({ content: login.error });
      }
      isMobile ? location.replace('/') : location.reload();
    }
  };
  return (
    <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>모두CBT 로그인</h1>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field }) => (
          <Input onChange={field.onChange} type="email" placeholder="이메일" />
        )}
      />
      {formState.errors['email']?.type === 'required' && (
        <ErrorText
          content="이메일을 입력해주세요."
          className="login-error-text"
        />
      )}
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            onChange={field.onChange}
            type="password"
            placeholder="비밀번호"
          />
        )}
      />
      {formState.errors['password']?.type === 'required' && (
        <ErrorText
          content="비밀번호를 입력해주세요."
          className="login-error-text"
        />
      )}
      <Button
        type="primary"
        htmlType="submit"
        disabled={buttonState}
        loading={buttonState}
      >
        로그인
      </Button>
      <div className="login-or-line" />
      <Button
        onClick={() => onKakaoAuth()}
        className="login-social-button kakao"
      >
        <div className="login-social-button-inner kakao">
          <KakaoIconSVG />
          <span>카카오 로그인</span>
        </div>
      </Button>
      <Button
        onClick={() => onGoogleAuth()}
        className="login-social-button google"
      >
        <div className="login-social-button-inner google">
          <GoogleIconSVG />
          <span>구글 로그인</span>
        </div>
      </Button>
    </LoginFormContainer>
  );
};

export default LoginForm;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .login-form-label {
    margin-top: 20px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  input {
    min-width: 250px;
    margin: 8px 0;
  }
  button {
    margin-top: 10px;
  }
  .login-error-text {
    font-size: 0.8rem;
    padding: 0 6px;
    /* margin-top: 5px; */
  }
  .login-or-line {
    width: 100%;
    border: 0.5px solid ${palette.gray_200};
    margin: 15px 0;
    position: relative;
    ::before {
      position: absolute;
      content: 'or';
      font-size: 0.8rem;
      color: ${palette.gray_500};
      top: -12px;
      transform: translateX(-50%);
      left: 50%;
      background-color: white;
      padding: 0 10px;
    }
  }

  .login-social-button {
    border: none;
    :hover {
      color: unset;
      opacity: 0.8;
    }
  }
  .login-social-button.kakao {
    background-color: ${palette.yellow_kakao};
  }
  .login-social-button.google {
    background-color: #374151;
  }
  .login-social-button-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
      position: absolute;
      left: 35px;
    }
  }
  .login-social-button-inner.kakao {
    svg {
      width: 18px;
      height: 18px;
    }
  }
  .login-social-button-inner.google {
    color: white;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
