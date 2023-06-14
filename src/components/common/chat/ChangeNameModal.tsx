import palette from '@styles/palette';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const ChangeNameModalBlock = styled.form`
  width: 250px;
  height: 160px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 100;
  bottom: 20%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .change-name-modal-label {
    font-size: 14px;
    border: 1px solid ${palette.antd_blue_01};
    color: ${palette.antd_blue_01};
    padding: 5px 15px;
    border-radius: 20px;
    margin-bottom: 15px;
  }
  .change-name-input {
    margin-bottom: 10px;
  }
  .change-name-button {
    width: 100%;
  }
`;

interface ChangeNameModalProps {
  isOpen: boolean;
  onConfirm: (value: string) => void;
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({
  isOpen,
  onConfirm,
}) => {
  const [value, setValue] = useState('');
  if (!isOpen) return null;
  return (
    <ChangeNameModalBlock
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm(value);
      }}
    >
      <div className="change-name-modal-label">닉네임 설정</div>
      <Input
        className="change-name-input"
        placeholder="1글자 이상, 10글자 미만"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className="change-name-button"
        type="primary"
        htmlType="submit"
        onClick={() => onConfirm(value)}
      >
        확인
      </Button>
    </ChangeNameModalBlock>
  );
};

export default ChangeNameModal;
