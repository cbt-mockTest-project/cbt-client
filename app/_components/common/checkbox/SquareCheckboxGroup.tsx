import { checkboxOption } from '../../../customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SquareCheckbox from './SquareCheckbox';

interface SquareCheckboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onChange?: (value: any[]) => void;
}

interface SquareCheckboxGroupCssProps
  extends Pick<SquareCheckboxGroupProps, 'gap'> {}

const SquareCheckboxGroup: React.FC<SquareCheckboxGroupProps> = ({
  options,
  onChange,
  gap = 10,
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const onCheckboxChange = (checked: boolean, value: string) => {
    if (checked) {
      return setCheckedValues([...checkedValues, value]);
    }
    const newCheckedValues = checkedValues.filter(
      (checkedValue) => checkedValue !== value
    );
    return setCheckedValues(newCheckedValues);
  };

  useEffect(() => {
    onChange && onChange(checkedValues);
  }, [checkedValues]);
  return (
    <SquareCheckboxGroupContainer gap={gap}>
      {options.map((option, index) => (
        <SquareCheckbox
          option={option}
          key={index}
          onChange={onCheckboxChange}
        />
      ))}
    </SquareCheckboxGroupContainer>
  );
};

export default SquareCheckboxGroup;

const SquareCheckboxGroupContainer = styled.div<SquareCheckboxGroupCssProps>`
  display: flex;
  gap: ${(props) => props.gap}px;
`;
