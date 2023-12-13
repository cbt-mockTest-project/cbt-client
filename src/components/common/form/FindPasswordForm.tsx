import { useSendFindPasswordMail } from '@lib/graphql/hook/useUser';
import useInput from '@lib/hooks/useInput';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

interface FindPasswordFormProps {}

const FindPasswordForm: React.FC<FindPasswordFormProps> = () => {
  const { value: email, onChange: onEmailChange } = useInput('');
  const [disabledState, setDisabledState] = useState(false);
  const [sendFindPasswordMailMutation] = useSendFindPasswordMail();
  const dispatch = useAppDispatch();
  const requestSendMail = async () => {
    const res = await sendFindPasswordMailMutation({
      variables: {
        input: { email },
      },
    });
    if (res.data?.sendFindPasswordMail.ok) {
      message.success({ content: '비밀번호변경 메일이 발송되었습니다.' });
      dispatch(coreActions.closeModal());
      return setDisabledState(true);
    }
    return message.error({ content: res.data?.sendFindPasswordMail.error });
  };

  return (
    <FindPasswordFormContainer>
      <h1>비밀번호 찾기</h1>
      <label className="find-password-form-label">이메일</label>
      <Input
        type="email"
        value={email}
        disabled={disabledState}
        onChange={onEmailChange}
      />
      <input type="text" style={{ display: 'none' }}></input>
      <Button type="primary" onClick={requestSendMail} disabled={disabledState}>
        비밀번호 재설정 메일발송
      </Button>
    </FindPasswordFormContainer>
  );
};

export default FindPasswordForm;

const FindPasswordFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .find-password-form-label {
    margin-top: 20px;
    color: ${palette.gray_700};
  }
  input {
    min-width: 250px;
  }
  button {
    margin-top: 15px;
  }
`;
