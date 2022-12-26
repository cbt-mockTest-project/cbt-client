import WithHead from '@components/common/head/WithHead';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import Layout from '@components/common/layout/Layout';
import { useSendVerificationMailMutation } from '@lib/graphql/user/hook/useUser';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { SendVerificationMailInput } from 'types';

const Confirm = () => {
  const { control, handleSubmit, formState } =
    useForm<SendVerificationMailInput>({ defaultValues: { email: '' } });
  const [sendVerificationMailMutation] = useSendVerificationMailMutation();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSubmit = async (data: SendVerificationMailInput) => {
    const { email } = data;
    const result = await sendVerificationMailMutation({
      variables: {
        input: { email },
      },
    });
    if (result.data) {
      const { sendVerificationMail } = result.data;
      if (sendVerificationMail.ok === false) {
        message.error({ content: sendVerificationMail.error });
      }
      if (sendVerificationMail.ok === true) {
        message.success({ content: '인증메일이 전송되었습니다.' });
        setButtonDisabled(true);
      }
    }
  };
  return (
    <>
      <WithHead
        title="이메일 인증 | 실기CBT"
        pageHeadingTitle="이메일 인증 페이지"
      />
      <Layout>
        <ConfirmContainer onSubmit={handleSubmit(onSubmit)}>
          <h1>가입을 위해 이메일을 인증해주세요.</h1>
          <div className="email-confirm-input-wrapper">
            <label className="email-confirm-input-label">이메일</label>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <Input onChange={field.onChange} type="email" />
              )}
            />
            {formState.errors['email']?.type === 'required' && (
              <ErrorText
                content="이메일을 입력해주세요."
                className="register-error-text"
              />
            )}
          </div>
          <Button type="primary" htmlType="submit" disabled={buttonDisabled}>
            이메일 인증요청
          </Button>
        </ConfirmContainer>
      </Layout>
    </>
  );
};

export default Confirm;

const ConfirmContainer = styled.form`
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 30px;
  }
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
  .email-confirm-input-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .email-confirm-input-label {
    margin-top: 20px;
    margin-bottom: 5px;
    color: ${palette.gray_700};
  }
  input {
    width: 400px;
  }
  button {
    margin-top: 20px;
  }
  .register-error-text {
    margin-top: 5px;
  }
`;
