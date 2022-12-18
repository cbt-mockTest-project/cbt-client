import useInput from '@lib/hooks/useInput';
import palette from '@styles/palette';
import { Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface FindPasswordFormProps {}

const FindPasswordForm: React.FC<FindPasswordFormProps> = () => {
  const { value, onChange } = useInput('');
  return (
    <FindPasswordFormContainer>
      <h1>비밀번호 찾기</h1>
      <label className="find-password-form-label">이메일</label>
      <Input type="email" value={value} onChange={onChange} />
      <Button type="primary">비밀번호 재설정 메일발송</Button>
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
