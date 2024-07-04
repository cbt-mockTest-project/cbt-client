import palette from '@styles/palette';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

export interface DropBoxOption {
  label: string;
  value?: string | number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface DropBoxProps {
  isOpen: boolean;
  options?: DropBoxOption[];
  children?: React.ReactNode;
  className?: string;
}

const DropBox: React.FC<DropBoxProps> = ({
  isOpen,
  options,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <DropBoxContainer className={className}>
      {options
        ? options.map((option, index) => (
            <li key={index}>
              <button onClick={option.onClick}>{option.label}</button>
            </li>
          ))
        : children}
    </DropBoxContainer>
  );
};

export default DropBox;

const DropBoxContainer = styled.ul`
  position: absolute;
  padding: 10px 0px;
  border: 1px solid ${palette.gray_400};
  background-color: white;
  border-radius: 5px;
  box-shadow: rgb(0 56 68 / 20%) 0px 5px 7px 0px;
  width: 100px;
  right: 0;
  top: 35px;
  z-index: 999;
  li {
    padding: 5px 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    font-size: 0.85rem;
    :hover {
      background-color: ${palette.gray_100};
    }
  }
`;
