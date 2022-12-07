import { checkboxOption } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import SquareSelectbox from './SquareSelectbox';

interface SquareSelectboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onChange?: (value: checkboxOption['value']) => Promise<void>;
  initialSelectedValue: string;
}

interface SquareSelectboxGroupCssProps
  extends Pick<SquareSelectboxGroupProps, 'gap'> {}

const SquareSelectboxGroup: React.FC<SquareSelectboxGroupProps> = ({
  options,
  onChange,
  initialSelectedValue,
  gap = 10,
}) => {
  const router = useRouter();
  const [selectedValue, setselectedValue] =
    useState<checkboxOption['value']>('CORE');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setselectedValue(initialSelectedValue);
    setMounted(true);
  }, [router.query]);

  useEffect(() => {
    if (onChange && mounted) {
      onChange(selectedValue);
    }
  }, [selectedValue]);
  const onSelectBoxClick = (value: checkboxOption['value']) => {
    if (value === selectedValue) return;
    setselectedValue(value);
  };
  return (
    <SquareSelectboxGroupContainer gap={gap}>
      {options.map((option, index) => {
        // console.log(option.value);
        // console.log(selectedValue);
        return (
          <SquareSelectbox
            option={option}
            key={index}
            selected={option.value === selectedValue}
            onClick={() => onSelectBoxClick(option.value)}
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
