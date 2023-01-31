import React, { useState } from 'react';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginInput } from 'types';
import ErrorText from '../layout/errorText/ErrorText';
import { useLoginMutation } from '@lib/graphql/user/hook/useUser';
import KakaoIconSVG from '@assets/svg/kakao.svg';
import { KAKAO_REDIRECT_URI, KAKAO_REST_API } from '@lib/constants';

interface LoginFormProps {
  isMobile?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isMobile = false }) => {
  const { control, formState, handleSubmit } = useForm<LoginInput>();
  const [loginMutation] = useLoginMutation();
  const [buttonState, setButtonState] = useState(false);
  const gotoSocialLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };
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
      <Button type="primary" htmlType="submit" disabled={buttonState}>
        로그인
      </Button>
      <div className="login-or-line" />
      <Button onClick={() => gotoSocialLogin()} className="login-social-button">
        <div className="login-social-button-inner">
          <KakaoIconSVG />
          <span>카카오 로그인</span>
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
    color: ${palette.gray_700};
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
    background-color: #fee500;
    border: none;
    :hover {
      color: unset;
      opacity: 0.8;
    }
  }

  .login-social-button-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
      position: absolute;
      width: 18px;
      left: 35px;
      height: 18px;
    }
  }
`;
