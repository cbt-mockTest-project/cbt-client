import React, { useEffect, useState } from 'react';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import {
  useEmailVerification,
  useRegisterMutation,
} from '@lib/graphql/user/hook/useUser';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RegisterInput } from 'types';

const Register = () => {
  const router = useRouter();
  const [emailVerificateMutation] = useEmailVerification();
  const [registerMutation, { loading: registerLoading }] =
    useRegisterMutation();
  const { code } = router.query;
  const [email, setEmail] = useState('');
  const { control, handleSubmit, formState, setValue } = useForm<RegisterInput>(
    {
      defaultValues: {
        code: '',
        nickname: '',
        password: '',
      },
    }
  );

  const callEmailVerification = async (code: string) => {
    const result = await emailVerificateMutation({
      variables: { input: { code } },
    });
    if (result.data) {
      const {
        emailVerification: { email: verificatedEmail },
      } = result.data;
      setEmail(verificatedEmail);
    }
  };

  useEffect(() => {
    if (code) {
      setValue('code', String(code));
      callEmailVerification(String(code));
    }
  }, [code]);

  const onSubmit = async (data: RegisterInput) => {
    const result = await registerMutation({
      variables: {
        input: data,
      },
    });
    if (result.data) {
      const { register } = result.data;
      if (register.ok === false) {
        return message.error({
          content: register.error,
        });
      }
      return message.success({
        content: '회원가입에 성공했습니다.',
        onClose: () => {
          router.push('/');
        },
      });
    }
  };
  return (
    <RegisterContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>실기CBT 회원가입</h1>
      <div className="register-input-wrapper">
        <label className="register-label">이메일</label>
        <Input value={email} disabled={true} />
        <label className="register-label">닉네임</label>
        <Controller
          control={control}
          name="nickname"
          rules={{ required: true }}
          render={({ field }) => <Input onChange={field.onChange} />}
        />
        {formState.errors['nickname']?.type === 'required' && (
          <ErrorText
            content="닉네임을 입력해주세요."
            className="register-error-text"
          />
        )}
      </div>
      <div className="register-input-wrapper">
        <label className="register-label">비밀번호</label>
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
      </div>
      <Button type="primary" htmlType="submit" loading={registerLoading}>
        회원가입
      </Button>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.form`
  .register-input-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 30px;
  }
  input {
    width: 400px;
  }
  button {
    margin-top: 20px;
  }
  .register-label {
    margin-top: 20px;
    margin-bottom: 5px;
    color: ${palette.gray_700};
  }
  .register-error-text {
    margin-top: 5px;
  }
`;
