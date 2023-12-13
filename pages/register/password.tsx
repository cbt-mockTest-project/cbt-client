import WithHead from '@components/common/head/WithHead';
import Label from '@components/common/label/Label';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import { useChangePasswordAfterVerifyingMutation } from '@lib/graphql/hook/useUser';
import useInput from '@lib/hooks/useInput';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface ChangePasswordForm {
  code: string;
  password: string;
  passwordCheck: string;
}

interface PasswordProps {}

const Password: NextPage<PasswordProps> = () => {
  const router = useRouter();
  const [changePasswordMutation] = useChangePasswordAfterVerifyingMutation();
  useInput('');
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [disabledState, setDisabledState] = useState(false);
  const code = router.query.key;
  const { control, handleSubmit, formState, setValue, getValues } =
    useForm<ChangePasswordForm>({
      defaultValues: {
        code: '',
        password: '',
        passwordCheck: '',
      },
    });

  useEffect(() => {
    if (router.query.key) {
      setValue('code', String(router.query.key));
    }
  }, [router.query.key]);

  const onSubmit = async (data: ChangePasswordForm) => {
    if (!passwordCheck || disabledState) return;
    if (!code) {
      return message.error('비정상적인 접근입니다.');
    }
    const res = await changePasswordMutation({
      variables: {
        input: {
          code: String(code),
          password: data.password,
        },
      },
    });
    if (res.data?.changePasswordAfterVerifying.ok) {
      setDisabledState(true);
      await message.success({ content: '비밀번호가 변경되었습니다' });
      return router.push('/');
    }
    message.error(res.data?.changePasswordAfterVerifying.error);
  };

  const onCheckPassword = () => {
    if (getValues('password') !== getValues('passwordCheck')) {
      return setPasswordCheck(false);
    }
    return setPasswordCheck(true);
  };

  return (
    <>
      <WithHead
        title="비밀번호변경 | 모두CBT"
        pageHeadingTitle="비밀번호변경 페이지"
      />
      <PasswordContainer onSubmit={handleSubmit(onSubmit)}>
        <h1>모두CBT 비밀번호 변경</h1>
        <Label content="비밀번호" className="password-label" />
        <Controller
          control={control}
          name="password"
          rules={{ required: true, minLength: 4 }}
          render={({ field }) => (
            <Input
              onChange={field.onChange}
              disabled={disabledState}
              placeholder="4글자 이상 입력해주세요."
              type="password"
            />
          )}
        />
        {['minLength', 'required'].includes(
          String(formState.errors['password']?.type)
        ) && <ErrorText content="비밀번호를 4글자 이상 입력해주세요." />}
        <Label content="비밀번호 확인" className="password-label" />
        <Controller
          control={control}
          name="passwordCheck"
          rules={{
            required: true,
            onChange: onCheckPassword,
          }}
          render={({ field }) => (
            <Input
              onChange={field.onChange}
              disabled={disabledState}
              type="password"
            />
          )}
        />
        {!passwordCheck && (
          <ErrorText
            content="비밀번호가 일치하지 않습니다."
            className="password-error-text"
          />
        )}
        <Button type="primary" disabled={disabledState} htmlType="submit">
          비밀번호 변경
        </Button>
      </PasswordContainer>
    </>
  );
};

export default Password;

const PasswordContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
  max-width: 450px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 30px;
  }

  button {
    margin-top: 20px;
  }
  .password-label {
    color: ${palette.subTextColor};
  }
  .password-error-text {
    font-size: 0.9rem;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;
