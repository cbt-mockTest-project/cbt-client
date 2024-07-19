import { LocalStorage } from '@lib/utils/localStorage';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

const HighlightColorSelectBlock = styled.div``;

interface HighlightColorSelectProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onSelectColor?: (color: string) => void;
}

export const HIGHLIGHT_YELLOW = '#FFFFA5';
export const HIGHLIGHT_GREEN = '#CCFFCC';
export const HIGHLIGHT_PINK = '#FFD1DC';
export const HIGHLIGHT_COLOR_KEY = 'highlightColor';

const HighlightColorSelect: React.FC<HighlightColorSelectProps> = ({
  selectedColor = HIGHLIGHT_YELLOW,
  setSelectedColor,
  onSelectColor,
}) => {
  const localStorage = new LocalStorage();
  const colors = [HIGHLIGHT_YELLOW, HIGHLIGHT_GREEN, HIGHLIGHT_PINK];
  const onClickColor = (color: string) => {
    setSelectedColor(color);
    localStorage.set(HIGHLIGHT_COLOR_KEY, color);
    onSelectColor?.(color);
  };
  return (
    <HighlightColorSelectBlock className="flex gap-2 items-center justify-center">
      {colors.map((color) => (
        <div
          key={color}
          style={{ backgroundColor: color }}
          className={clsx(
            'w-6 h-6 rounded-full hover:cursor-pointer hover:border-2 hover:border-black hover:border-solid',
            selectedColor === color && 'border-2 border-black border-solid'
          )}
          onClick={() => onClickColor(color)}
        ></div>
      ))}
    </HighlightColorSelectBlock>
  );
};

export default HighlightColorSelect;
