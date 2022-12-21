import palette from '@styles/palette';
import { checkboxOption } from 'customTypes';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface RoundCheckboxProps {
  option: checkboxOption;
  height?: number;
  defaultChecked?: boolean;
  onChange: (checked: boolean, value: string) => void;
}

const RoundCheckbox: React.FC<RoundCheckboxProps> = ({
  option,
  defaultChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [value, setValue] = useState('');
  useEffect(() => {
    value && onChange(checked, value);
  }, [checked, value]);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setValue(e.target.value);
  };
  return (
    <RoundCheckboxContainer>
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
    </RoundCheckboxContainer>
  );
};

export default RoundCheckbox;

const RoundCheckboxContainer = styled.li<Partial<RoundCheckboxProps>>`
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
    border: 1px solid ${palette.gray_300};
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
