import { PlusOutlined } from '@ant-design/icons';
import { PlusOne } from '@mui/icons-material';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const TodoWriteToggleButtonBlock = styled.button`
  background-color: ${palette.antd_blue_02};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  svg {
    fill: white;
    font-size: 30px;
  }
`;

interface TodoWriteToggleButtonProps {
  onClick?: () => void;
}

const TodoWriteToggleButton: React.FC<TodoWriteToggleButtonProps> = ({
  onClick,
}) => {
  return (
    <TodoWriteToggleButtonBlock onClick={onClick}>
      <PlusOutlined />
    </TodoWriteToggleButtonBlock>
  );
};

export default TodoWriteToggleButton;
