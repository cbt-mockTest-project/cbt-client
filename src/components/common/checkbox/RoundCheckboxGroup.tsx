import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoundCheckbox from './RoundCheckbox';

interface RoundCheckboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onChange?: (value: any[]) => void;
}

interface RoundCheckboxGroupCssProps
  extends Pick<RoundCheckboxGroupProps, 'gap'> {}

const RoundCheckboxGroup: React.FC<RoundCheckboxGroupProps> = ({
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
    <RoundCheckboxGroupContainer gap={gap}>
      {options.map((option, index) => (
        <RoundCheckbox
          option={option}
          key={index}
          onChange={onCheckboxChange}
        />
      ))}
    </RoundCheckboxGroupContainer>
  );
};

export default RoundCheckboxGroup;

const RoundCheckboxGroupContainer = styled.ul<RoundCheckboxGroupCssProps>`
  display: inline-block;
`;
