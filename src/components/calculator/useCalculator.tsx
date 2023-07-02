import { useEffect, useState } from 'react';
import * as math from 'mathjs';
import { LocalStorage } from '@lib/utils/localStorage';
import shortid from 'shortid';
import { CALCULATOR_HISTORY } from './calculator.constants';
import { isMobile } from 'react-device-detect';

interface CalculatorHistory {
  expression: string;
  result: string;
  key: string;
}
interface CalculatorHookProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  calculatorRef: React.MutableRefObject<HTMLDivElement | null>;
}

const useCalculator = ({ inputRef, calculatorRef }: CalculatorHookProps) => {
  const [input, setInput] = useState('');
  const [calculatorHistories, setCalculatorHistories] = useState<
    CalculatorHistory[]
  >([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const storage = new LocalStorage();
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
  const calculate = () => {
    try {
      const inputInDegrees = input
        .replace(/(\d+)\^(\d+)/g, 'pow($1, $2)')
        .replace(/(sin|cos|tan)\(([^)]+)\)/g, '$1($2 deg)');
      const answer = math.evaluate(inputInDegrees);
      if (answer.toString() === input) return;
      setInput(answer.toString());
      const history = storage.get(CALCULATOR_HISTORY);
      const newHistory = [
        {
          expression: input,
          result: answer.toString(),
          key: shortid.generate(),
        },
        ...history,
      ];
      storage.set(CALCULATOR_HISTORY, newHistory);
    } catch (e) {
      alert('잘못된 수식입니다.');
    }
  };

  const handleMouseUp = () => {
    setCursorPosition(inputRef.current?.selectionStart as number);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      calculate();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9+\-*/().e^sin(cos(tan() ]*$/.test(value)) {
      setInput(value);
      setCursorPosition(e.target.selectionStart as number);
    }
  };

  const handleDeleteCalculatorHistroy = (key: string) => {
    const histories: CalculatorHistory[] = storage.get(CALCULATOR_HISTORY);
    histories.splice(
      histories.findIndex((history) => history.key === key),
      1
    );
    storage.set(CALCULATOR_HISTORY, histories);
    setCalculatorHistories(histories);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.getAttribute('value');
    if (value === null) return;
    if (value === '=') {
      calculate();
    } else if (value === 'C') {
      setInput('');
      setCursorPosition(0);
    } else if (value === 'e') {
      const newInput = [
        input.slice(0, cursorPosition),
        'e',
        input.slice(cursorPosition),
      ].join('');
      const newCursorPosition = cursorPosition + 1;
      setInput(newInput);
      setCursorPosition(newCursorPosition);
    } else if (['sin', 'cos', 'tan', 'exp'].includes(value)) {
      const newInput = [
        input.slice(0, cursorPosition),
        value + '()',
        input.slice(cursorPosition),
      ].join('');
      const newCursorPosition = cursorPosition + value.length + 1; // account for one parenthesis
      setInput(newInput);
      setCursorPosition(newCursorPosition);
    } else {
      const newInput = [
        input.slice(0, cursorPosition),
        value,
        input.slice(cursorPosition),
      ].join('');
      const newCursorPosition = cursorPosition + value.length;
      setInput(newInput);
      setCursorPosition(newCursorPosition);
    }
  };

  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition, inputRef.current]);

  useEffect(() => {
    if (!calculatorRef.current) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === 'Enter') {
        calculate();
      }
    };

    calculatorRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      calculatorRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, cursorPosition, calculatorRef]);

  useEffect(() => {
    const savedHistories: CalculatorHistory[] = storage.get(CALCULATOR_HISTORY);
    if (
      !savedHistories ||
      savedHistories.length === 0 ||
      JSON.stringify(savedHistories) === JSON.stringify(calculatorHistories)
    )
      return;
    setCalculatorHistories(savedHistories);
  }, [storage.get(CALCULATOR_HISTORY)]);

  useEffect(() => {
    if (inputRef.current && isMobile) {
      inputRef.current.blur();
    }
  }, [inputRef.current?.focus]);

  return {
    input,
    buttons,
    cursorPosition,
    handleMouseUp,
    handleKeyDown,
    handleInput,
    handleClick,
    calculatorHistories,
    handleDeleteCalculatorHistroy,
  };
};

export default useCalculator;
