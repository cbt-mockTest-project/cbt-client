import { useSendFindPasswordMail } from '@lib/graphql/hook/useUser';
import useInput from '@lib/hooks/useInput';
import { App, Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const FindPasswordTabBlock = styled.div`
  .find-password-tab-title {
    margin-bottom: 15px;
  }
  .find-password-tab-button {
    margin-top: 10px;
    width: 100%;
  }
`;

interface FindPasswordTabProps {}

const FindPasswordTab: React.FC<FindPasswordTabProps> = () => {
  const { message } = App.useApp();
  const { value: email, onChange: onEmailChange } = useInput('');
  const [sendFindPasswordMailMutation, { loading: sendFindPasswordLoading }] =
    useSendFindPasswordMail();
  const handleFindPassword = async () => {
    const res = await sendFindPasswordMailMutation({
      variables: {
        input: { email },
      },
    });
    if (res.data?.sendFindPasswordMail.ok) {
      return message.success('메일을 확인해주세요.');
    }
    return message.error(res.data?.sendFindPasswordMail.error);
  };
  return (
    <FindPasswordTabBlock>
      <p className="find-password-tab-title">비밀번호 찾기</p>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요."
        value={email}
        disabled={sendFindPasswordLoading}
        onChange={onEmailChange}
      />
      <Button
        className="find-password-tab-button"
        type="primary"
        onClick={handleFindPassword}
        disabled={sendFindPasswordLoading}
      >
        메일 발송
      </Button>
    </FindPasswordTabBlock>
  );
};

export default FindPasswordTab;
