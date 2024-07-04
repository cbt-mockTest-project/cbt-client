import { PlusOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const PlusCircleButtonBlock = styled.div`
  color: ${({ theme }) => theme.color('colorTextTertiary')};
  border: 1px dashed ${({ theme }) => theme.color('colorTextTertiary')};
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
    border-color: ${({ theme }) => theme.color('colorPrimary')};
    color: ${({ theme }) => theme.color('colorPrimary')};
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
