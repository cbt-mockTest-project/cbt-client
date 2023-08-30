import palette from '@styles/palette';
import { checkboxOption } from 'customTypes';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface SquareCheckboxProps {
  option: checkboxOption;
  minWidth?: number;
  height?: number;
  width?: number;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, value: string) => void;
}

const SquareCheckbox: React.FC<SquareCheckboxProps> = ({
  option,
  minWidth = 35,
  height = 35,
  width = 35,
  defaultChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [value, setValue] = useState('');
  useEffect(() => {
    onChange && onChange(checked, value);
  }, [checked]);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setValue(e.target.value);
  };
  return (
    <SquareCheckboxContainer minWidth={minWidth} height={height} width={width}>
      <input
        value={option.value}
        id={`checkbox-${option.value}`}
        name={`checkbox-${option.value}`}
        type="checkbox"
        onChange={onCheckboxChange}
      />
      <label
        htmlFor={`checkbox-${option.value}`}
        className={`select-none ${checked && 'active'}`}
      >
        {option.label}
      </label>
    </SquareCheckboxContainer>
  );
};

export default SquareCheckbox;

const SquareCheckboxContainer = styled.div<Partial<SquareCheckboxProps>>`
  input {
    display: none;
  }
  label {
    transition: all 0.1s ease-in;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    border: 1px solid ${palette.gray_400};
    border-radius: 3px;
    min-width: ${(props) => props.minWidth}px;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
  }
  .active {
    border-color: ${palette.antd_blue_01};
    color: ${palette.antd_blue_01};
  }
`;
