import { PlusOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const PlusCircleButtonBlock = styled.div`
  color: ${palette.gray_700};
  border: 1px dashed ${palette.gray_700};
  width: 30px;
  height: 30px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-radius: 50%;
  transition: 0.2s all ease-in;
  &:hover {
    border-color: ${palette.antd_blue_02};
    color: ${palette.antd_blue_02};
  }
  svg {
    font-size: 16px;
    font-weight: bold;
  }
`;

interface PlusCircleButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PlusCircleButton: React.FC<PlusCircleButtonProps> = ({ onClick }) => {
  return (
    <PlusCircleButtonBlock onClick={onClick} role="button">
      <PlusOutlined />
    </PlusCircleButtonBlock>
  );
};

export default PlusCircleButton;
