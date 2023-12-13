import ErrorText from '@components/common/layout/errorText/ErrorText';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API,
} from '@lib/constants';
import { useLoginMutation } from '@lib/graphql/hook/useUser';
import { Button, Divider, Input, message } from 'antd';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginInput } from 'types';
import GoogleIconSVG from '@mui/icons-material/Google';
import KakaoIconSVG from '@assets/svg/kakao.svg';
import Link from 'next/link';
import palette from '@styles/palette';

const LoginTabBlock = styled.form`
  .login-error-text {
    font-size: 0.8rem;
    padding: 0 6px;
    display: block;
  }
  .login-input,
  .login-email-login-button {
  }
  .login-email-login-wrapper {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .login-social-button-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .login-social-button-inner.kakao {
    svg {
      width: 16px;
      height: 16px;
    }
  }
  .login-social-button-inner.google {
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .login-social-login-button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    button {
      width: 100%;
    }
  }
  .login-divider-label {
    font-size: 12px;
    font-weight: bold;
    color: ${palette.subTextColor};
  }
`;

interface LoginTabProps {}

const LoginTab: React.FC<LoginTabProps> = () => {
  const { control, formState, handleSubmit } = useForm<LoginInput>();
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (!router.asPath) return;
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
    <LoginTabBlock onSubmit={handleSubmit(onSubmit)}>
      <p>로그인</p>
      <div className="login-email-login-wrapper">
        <div>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                className="login-input"
                onChange={field.onChange}
                type="email"
                placeholder="이메일"
              />
            )}
          />
          {formState.errors['email']?.type === 'required' && (
            <ErrorText
              content="이메일을 입력해주세요."
              className="login-error-text"
            />
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                className="login-input"
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
        </div>
        <Button
          className="login-email-login-button"
          htmlType="submit"
          type="primary"
          disabled={buttonState}
        >
          로그인
        </Button>
      </div>
      <Divider>
        <span className="login-divider-label">또는</span>
      </Divider>
      <div className="login-social-login-button-wrapper">
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}
        >
          <Button>
            <div className="login-social-button-inner kakao">
              <KakaoIconSVG />
              <span>카카오 로그인</span>
            </div>
          </Button>
        </Link>
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`}
        >
          <Button>
            <div className="login-social-button-inner google">
              <GoogleIconSVG />
              <span>구글 로그인</span>
            </div>
          </Button>
        </Link>
      </div>
    </LoginTabBlock>
  );
};

export default LoginTab;
