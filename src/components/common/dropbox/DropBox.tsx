import palette from '@styles/palette';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

export interface DropBoxOption {
  label: string;
  value?: string | number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface DropBoxProps {
  isOpen: boolean;
  options: DropBoxOption[];
}

const DropBox: React.FC<DropBoxProps> = ({ isOpen, options }) => {
  if (!isOpen) return null;

  return (
    <DropBoxContainer>
      {options.map((option, index) => (
        <li key={index}>
          <button onClick={option.onClick}>{option.label}</button>
        </li>
      ))}
    </DropBoxContainer>
  );
};

export default DropBox;

const DropBoxContainer = styled.ul`
  position: absolute;
  padding: 10px 0px;
  border: 1px solid ${palette.gray_300};
  background-color: white;
  border-radius: 5px;
  box-shadow: rgb(0 56 68 / 20%) 0px 5px 7px 0px;
  width: 100px;
  top: 35px;
  li {
    padding: 5px 10px;
    cursor: pointer;
    color: ${palette.gray_700};
    font-size: 0.85rem;
    :hover {
      background-color: ${palette.gray_100};
    }
  }
`;
