import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { checkboxOption } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import SquareSelectbox from './SquareSelectbox';

interface SquareSelectboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onClick: (value: checkboxOption['value']) => void;
  initialSelectedValue: string;
}

interface SquareSelectboxGroupCssProps
  extends Pick<SquareSelectboxGroupProps, 'gap'> {}

const SquareSelectboxGroup: React.FC<SquareSelectboxGroupProps> = ({
  options,
  onClick,
  initialSelectedValue,
  gap = 10,
}) => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] =
    useState<checkboxOption['value']>('CORE');
  useEffect(() => {
    setSelectedValue(initialSelectedValue);
  }, [router.query.q]);
  const requestOnclick = (value: string) => {
    setSelectedValue(value);
    onClick(value);
  };
  const tryOnClick = (value: string) =>
    convertWithErrorHandlingFunc({ callback: () => requestOnclick(value) });
  return (
    <SquareSelectboxGroupContainer gap={gap} id="square-select-box-group">
      {options.map((option, index) => {
        return (
          <SquareSelectbox
            option={option}
            key={index}
            selected={option.value === selectedValue}
            onClick={() => tryOnClick(String(option.value))()}
          />
        );
      })}
    </SquareSelectboxGroupContainer>
  );
};

export default SquareSelectboxGroup;

const SquareSelectboxGroupContainer = styled.div<SquareSelectboxGroupCssProps>`
  display: flex;
  gap: ${(props) => props.gap}px;
`;
