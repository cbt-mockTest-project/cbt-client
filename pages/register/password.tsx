import Label from '@components/common/label/Label';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import Layout from '@components/common/layout/Layout';
import { useChangePasswordAfterVerifyingMutation } from '@lib/graphql/user/hook/useUser';
import useInput from '@lib/hooks/useInput';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PasswordProps {}

const Password: NextPage<PasswordProps> = () => {
  const router = useRouter();
  const { value: password, onChange: onPasswordChange } = useInput('');
  const [changePasswordMutation] = useChangePasswordAfterVerifyingMutation();
  const { value: passwordCheck, onChange: onPasswordCheckChange } =
    useInput('');
  const [errorState, setErrorState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const code = router.query.key;
  useEffect(() => {
    if (passwordCheck && password !== passwordCheck && !errorState) {
      setErrorState(true);
    }
    if (passwordCheck && password === passwordCheck && errorState) {
      setErrorState(false);
    }
  }, [passwordCheck, password]);
  const requestChangePassword = async () => {
    if (code) {
      const res = await changePasswordMutation({
        variables: {
          input: {
            code: String(code),
            password: passwordCheck,
          },
        },
      });
      if (res.data?.changePasswordAfterVerifying.ok) {
        setDisabledState(true);
        await message.success({ content: '비밀번호가 변경되었습니다' });
        return router.push('/');
      }
      message.error(res.data?.changePasswordAfterVerifying.error);
    }
  };
  const tryRequestChangePassword = convertWithErrorHandlingFunc({
    callback: requestChangePassword,
  });
  return (
    <Layout>
      <PasswordContainer>
        <h1>실기CBT 비밀번호 변경</h1>
        <Label content="비밀번호" className="password-label" />
        <Input
          value={password}
          onChange={onPasswordChange}
          disabled={disabledState}
          type="password"
        />
        <Label content="비밀번호 확인" className="password-label" />
        <Input
          value={passwordCheck}
          onChange={onPasswordCheckChange}
          disabled={disabledState}
          type="password"
        />
        {errorState && (
          <ErrorText
            content="비밀번호가 일치하지 않습니다."
            className="password-error-text"
          />
        )}
        <Button
          type="primary"
          disabled={disabledState}
          onClick={tryRequestChangePassword}
        >
          비밀번호 변경
        </Button>
      </PasswordContainer>
    </Layout>
  );
};

export default Password;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 30px;
  }
  input {
    max-width: 400px;
  }
  button {
    margin-top: 20px;
    max-width: 400px;
  }
  .password-label {
    color: ${palette.gray_700};
  }
  .password-error-text {
    font-size: 0.9rem;
  }
`;
