import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as math from 'mathjs';
import { Button } from 'antd';
import useCalculator from './useCalculator';

const CalculatorBlock = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  gap: 20px;
  input[readonly]::selection {
    background: transparent;
  }
`;
const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const buttons = [
  '1',
  '2',
  '3',
  '+',
  '4',
  '5',
  '6',
  '-',
  '7',
  '8',
  '9',
  '*',
  '0',
  '.',
  '=',
  '/',
  'C',
  '(',
  ')',
  '^',
  'sin',
  'cos',
  'tan',
  'e',
];

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const { input, handleClick, handleInput, handleKeyDown, handleMouseUp } =
    useCalculator({ inputRef, calculatorRef });

  return (
    <CalculatorBlock ref={calculatorRef}>
      <StyledInput
        type="text"
        value={input}
        ref={inputRef}
        onChange={handleInput}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
      />
      <ButtonGrid>
        {buttons.map((button, index) => (
          <Button key={index} value={button} onClick={handleClick}>
            {button}
          </Button>
        ))}
      </ButtonGrid>
    </CalculatorBlock>
  );
};

export default Calculator;
