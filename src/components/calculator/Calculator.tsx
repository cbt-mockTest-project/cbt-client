import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import useCalculator from './useCalculator';
import { Clear } from '@mui/icons-material';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';

interface CalculatorBlockProps {
  isVisible: boolean;
}

const CalculatorBlock = styled.div<CalculatorBlockProps>`
  position: fixed;
  z-index: 999;
  left: 40px;
  bottom: 40px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  gap: 20px;
  .calculator-input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  .calculator-button-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .calculator-history-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    gap: 5px;
    max-height: 200px;
    overflow-y: auto;
  }
  .calculator-history-list-item {
    font-size: 14px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .calculator-history-list-item-delete-button {
    height: 20px;
    width: 20px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .calculator-history-list-item-content {
    display: flex;
    align-items: center;
    gap: 5px;
    + div {
      margin-top: 5px;
    }
  }
  .calculator-history-list-item-label {
    border-radius: 4px;
    padding: 0 5px;
    background-color: ${palette.gray_100};
  }
  .calculator-clear-button {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 24px;
  }
  @media (max-width: ${responsive.medium}) {
    bottom: 0;
    left: 0;
    .todo-list-block-inner {
      width: 100vw;
      height: 100vh;
    }
  }

  ${({ isVisible }) => css`
    transform: ${isVisible ? 'translateY(0)' : 'translateY(100%)'};
    transition: transform 0.3s ease;
  `}
`;

interface CalculatorProps {
  onClose: () => void;
  isVisible: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose, isVisible }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const {
    input,
    handleClick,
    handleInput,
    handleKeyDown,
    handleMouseUp,
    buttons,
    calculatorHistories,
    handleDeleteCalculatorHistroy,
  } = useCalculator({ inputRef, calculatorRef });

  return (
    <CalculatorBlock ref={calculatorRef} isVisible={isVisible}>
      <input
        className="calculator-input"
        type="text"
        value={input}
        ref={inputRef}
        onChange={handleInput}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
      />
      <div className="calculator-button-grid">
        {buttons.map((button, index) => (
          <Button key={index} value={button} onClick={handleClick}>
            {button}
          </Button>
        ))}
      </div>
      <ul className="calculator-history-list">
        {calculatorHistories.map((history) => (
          <li className="calculator-history-list-item" key={history.key}>
            <div>
              <div className="calculator-history-list-item-content">
                <span className="calculator-history-list-item-label">식</span>
                <span>{history.expression}</span>
              </div>
              <div className="calculator-history-list-item-content">
                <span className="calculator-history-list-item-label">값</span>
                <span>{history.result}</span>
              </div>
            </div>
            <button
              className="calculator-history-list-item-delete-button"
              onClick={() => handleDeleteCalculatorHistroy(history.key)}
            >
              <Clear />
            </button>
          </li>
        ))}
      </ul>
      <button className="calculator-clear-button" onClick={onClose}>
        <Clear />
      </button>
    </CalculatorBlock>
  );
};

export default Calculator;
