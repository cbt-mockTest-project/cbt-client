import WithHead from '@components/common/head/WithHead';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import { useSendVerificationMailMutation } from '@lib/graphql/hook/useUser';
import { responsive } from '@lib/utils/responsive';
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
        title="이메일 인증 | 모두CBT"
        pageHeadingTitle="이메일 인증 페이지"
      />
      <ConfirmContainer onSubmit={handleSubmit(onSubmit)}>
        <p className="email-confirm-title">
          가입을 위해 이메일을 인증해주세요.
        </p>
        <div className="email-confirm-input-wrapper">
          <label className="email-confirm-input-label">이메일</label>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                placeholder="example@google.com"
                onChange={field.onChange}
                type="email"
              />
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
    </>
  );
};

export default Confirm;

const ConfirmContainer = styled.form`
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  .email-confirm-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .email-confirm-input-wrapper {
    display: flex;
    flex-direction: column;
  }
  .email-confirm-input-label {
    margin-top: 20px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }

  button {
    margin-top: 15px;
  }
  .register-error-text {
    margin-top: 5px;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
    .email-confirm-title {
      font-size: 1rem;
      margin-bottom: 10px;
    }
  }
`;
