import React, { useEffect, useState } from 'react';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import {
  useEmailVerification,
  useRegisterMutation,
} from '@lib/graphql/hook/useUser';
import { App, Button, Checkbox, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RegisterInput } from 'types';
import WithHead from '@components/common/head/WithHead';
import { responsive } from '@lib/utils/responsive';
import BasicBox from '@components/common/box/BasicBox';
import { termsCondition } from '@lib/constants/termsCondition';

const Register = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const [emailVerificateMutation] = useEmailVerification();
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);
  const [registerMutation, { loading: registerLoading }] =
    useRegisterMutation();
  const { code } = router.query;
  const [email, setEmail] = useState('');
  const [termsConditionChecked, setTermsConditionChecked] = useState(false);
  const { control, handleSubmit, formState, setValue, watch } =
    useForm<RegisterInput>({
      defaultValues: {
        code: '',
        nickname: '',
        password: '',
      },
    });
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        value.nickname &&
        value.password &&
        registerButtonDisabled &&
        termsConditionChecked
      ) {
        setRegisterButtonDisabled(false);
      } else if (
        !(value.nickname && value.password) &&
        !registerButtonDisabled
      ) {
        setRegisterButtonDisabled(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, registerButtonDisabled, termsConditionChecked]);
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

  const onChangeTermsConditionCheckbox = () => {
    setTermsConditionChecked(!termsConditionChecked);
    if (watch('nickname') && watch('password') && !termsConditionChecked) {
      setRegisterButtonDisabled(false);
    } else {
      setRegisterButtonDisabled(true);
    }
  };

  const onSubmit = async (data: RegisterInput) => {
    if (registerButtonDisabled) return;
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
      setRegisterButtonDisabled(true);
      message.success({
        content: '회원가입에 성공했습니다.',
      });
      return router.push('/');
    }
  };
  return (
    <>
      <WithHead title="회원가입 | 모두CBT" pageHeadingTitle="회원가입 페이지" />
      <RegisterContainer onSubmit={handleSubmit(onSubmit)}>
        <p className="register-title">모두CBT 회원가입</p>
        <div className="register-input-wrapper">
          <label className="register-label">이메일</label>
          <Input value={email} disabled={true} className="register-input" />
          <label className="register-label">닉네임</label>
          <Controller
            control={control}
            name="nickname"
            rules={{ required: true }}
            render={({ field }) => (
              <Input onChange={field.onChange} className="register-input" />
            )}
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
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <Input
                onChange={field.onChange}
                type="password"
                className="register-input"
                placeholder="4글자 이상 입력해주세요."
              />
            )}
          />
          {['minLength', 'required'].includes(
            String(formState.errors['password']?.type)
          ) && (
            <ErrorText
              content="비밀번호를 4글자 이상 입력해주세요."
              className="register-error-text"
            />
          )}
        </div>
        <BasicBox maxHeight={200} className="register-terms-condition-wrapper">
          {termsCondition}
        </BasicBox>
        <div className="register-terms-condition-checkbox-wrapper">
          <div>동의</div>
          <Checkbox
            onChange={onChangeTermsConditionCheckbox}
            checked={termsConditionChecked}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="register-button"
          loading={registerLoading}
          disabled={registerButtonDisabled}
        >
          회원가입
        </Button>
      </RegisterContainer>
    </>
  );
};

export default Register;

const RegisterContainer = styled.form`
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  max-width: 450px;

  .register-input-wrapper {
    display: flex;
    flex-direction: column;
  }
  .register-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .register-label {
    margin-top: 20px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .register-error-text {
    margin-top: 5px;
  }
  .register-terms-condition-wrapper {
    font-size: 0.8rem;
    margin-top: 20px;
  }
  .register-terms-condition-checkbox-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 10px 0;
    font-size: 0.8rem;
    margin-left: auto;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
    .register-title {
      font-size: 1rem;
    }
  }
`;
