import palette from '@styles/palette';
import { checkboxOption, SelectboxArg } from 'customTypes';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface SquareSelectboxProps {
  option: checkboxOption;
  minWidth?: number;
  height?: number;
  width?: number;
  selected: boolean;
  onChange?: ({ selected, value }: SelectboxArg) => void;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
}

const SquareSelectbox: React.FC<SquareSelectboxProps> = ({
  option,
  minWidth = 35,
  height = 35,
  width = 35,
  onChange,
  onClick,
  selected = false,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (onChange && mounted) {
      onChange({ selected, value: option.value });
    }
  }, [selected]);

  return (
    <SquareSelectboxContainer minWidth={minWidth} height={height} width={width}>
      <label
        onClick={onClick}
        htmlFor={`checkbox-${option.value}`}
        className={`select-none ${selected && 'active'}`}
      >
        {option.label}
      </label>
    </SquareSelectboxContainer>
  );
};

export default SquareSelectbox;

const SquareSelectboxContainer = styled.div<Partial<SquareSelectboxProps>>`
  input {
    display: none;
  }
  label {
    transition: all 0.2s ease-in;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    border: 1px solid ${palette.gray_300};
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
