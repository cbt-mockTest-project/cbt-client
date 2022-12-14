import React, { useEffect, useState } from 'react';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import {
  useEmailVerification,
  useRegisterMutation,
} from '@lib/graphql/user/hook/useUser';
import palette from '@styles/palette';
import { Button, Checkbox, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RegisterInput } from 'types';
import Layout from '@components/common/layout/Layout';
import WithHead from '@components/common/head/WithHead';
import { responsive } from '@lib/utils/responsive';
import BasicBox from '@components/common/box/BasicBox';
import { termsCondition } from '@lib/constants/termsCondition';

const Register = () => {
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
        content: '??????????????? ??????????????????.',
      });
      return router.push('/');
    }
  };
  return (
    <>
      <WithHead title="???????????? | ??????CBT" pageHeadingTitle="???????????? ?????????" />
      <Layout>
        <RegisterContainer onSubmit={handleSubmit(onSubmit)}>
          <h1>??????CBT ????????????</h1>
          <div className="register-input-wrapper">
            <label className="register-label">?????????</label>
            <Input value={email} disabled={true} className="register-input" />
            <label className="register-label">?????????</label>
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
                content="???????????? ??????????????????."
                className="register-error-text"
              />
            )}
          </div>
          <div className="register-input-wrapper">
            <label className="register-label">????????????</label>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  onChange={field.onChange}
                  type="password"
                  className="register-input"
                />
              )}
            />
            {formState.errors['password']?.type === 'required' && (
              <ErrorText
                content="??????????????? ??????????????????."
                className="register-error-text"
              />
            )}
          </div>
          <BasicBox
            maxHeight={200}
            className="register-terms-condition-wrapper"
          >
            {termsCondition}
          </BasicBox>
          <div className="register-terms-condition-checkbox-wrapper">
            <div>??????</div>
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
            ????????????
          </Button>
        </RegisterContainer>
      </Layout>
    </>
  );
};

export default Register;

const RegisterContainer = styled.form`
  margin-bottom: 50px !important;
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
  .register-input {
    width: 400px;
  }
  .register-button {
    margin-top: 10px;
  }
  .register-label {
    margin-top: 20px;
    margin-bottom: 5px;
    color: ${palette.gray_700};
  }
  .register-error-text {
    margin-top: 5px;
  }
  .register-terms-condition-wrapper {
    font-size: 0.8rem;
    margin-top: 20px;
    width: 400px;
  }
  .register-terms-condition-checkbox-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 5px 0;
    margin-left: auto;
    font-size: 0.8rem;
  }
  @media (max-width: ${responsive.medium}) {
    justify-content: center;
    align-items: center;
    .register-input {
      width: 100%;
      min-width: 250px;
    }
    .register-terms-condition-wrapper {
      width: 250px;
    }
    .register-button {
      min-width: 250px;
    }
  }
`;
