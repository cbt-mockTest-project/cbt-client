import palette from '@styles/palette';
import { checkboxOption } from 'customTypes';
import React from 'react';
import styled from 'styled-components';

interface RoundSelectboxProps {
  option: checkboxOption;
  height?: number;
  checked: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const RoundSelectbox: React.FC<RoundSelectboxProps> = ({
  option,
  checked,
  onClick,
}) => {
  return (
    <RoundSelectboxContainer>
      <input
        value={option.value}
        id={`checkbox-${option.value}`}
        name={`checkbox-${option.value}`}
        type="checkbox"
        onClick={onClick}
      />
      <label
        htmlFor={`checkbox-${option.value}`}
        className={`select-none ${checked && 'active'}`}
      >
        {option.label}
      </label>
    </RoundSelectboxContainer>
  );
};

export default RoundSelectbox;

const RoundSelectboxContainer = styled.li<Partial<RoundSelectboxProps>>`
  position: relative;
  font-size: 0.9rem;
  display: inline-block;
  + li {
    margin-left: 10px;
  }
  input {
    display: none;
  }
  label {
    display: block;
    transition: all 0.2s ease-in;
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid ${palette.gray_400};
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .active {
    border-color: ${palette.antd_blue_01};
    color: ${palette.antd_blue_01};
  }
`;
