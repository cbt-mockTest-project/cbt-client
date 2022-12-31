import React, { useState } from 'react';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginInput } from 'types';
import ErrorText from '../layout/errorText/ErrorText';
import { useLoginMutation } from '@lib/graphql/user/hook/useUser';

interface LoginFormProps {
  isMobile?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isMobile = false }) => {
  const { control, formState, handleSubmit } = useForm<LoginInput>();
  const [loginMutation] = useLoginMutation();
  const [buttonState, setButtonState] = useState(false);
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
      <label className="login-form-label">이메일</label>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field }) => <Input onChange={field.onChange} type="email" />}
      />
      {formState.errors['email']?.type === 'required' && (
        <ErrorText
          content="이메일을 입력해주세요."
          className="register-error-text"
        />
      )}
      <label className="login-form-label">비밀번호</label>
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field }) => (
          <Input onChange={field.onChange} type="password" />
        )}
      />
      {formState.errors['password']?.type === 'required' && (
        <ErrorText
          content="비밀번호를 입력해주세요."
          className="register-error-text"
        />
      )}
      <Button type="primary" htmlType="submit" disabled={buttonState}>
        로그인
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
  }
  button {
    margin-top: 15px;
  }
  .register-error-text {
    margin-top: 5px;
  }
`;
