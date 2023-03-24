import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import { circleIcon, triangleIcon, clearIcon } from '@lib/constants';
import { checkboxOption } from 'customTypes';
import SquareSelectbox from './SquareSelectbox';

interface StateSelecboxGroupProps {
  className?: string;
  defaultState: QuestionState;
  onClick: (value: checkboxOption['value']) => Promise<boolean>;
}

const StateSelecboxGroup: React.FC<StateSelecboxGroupProps> = ({
  className,
  defaultState,
  onClick,
}) => {
  const [selectedState, setSelectedState] =
    useState<QuestionState>(defaultState);
  const states: checkboxOption[] = [
    { value: QuestionState.High, label: circleIcon },
    { value: QuestionState.Middle, label: triangleIcon },
    { value: QuestionState.Row, label: clearIcon },
  ];
  return (
    <StateSelecboxGroupContainer className={className}>
      {states.map((state, index) => (
        <SquareSelectbox
          key={index}
          option={state}
          selected={state.value === selectedState}
          onClick={async () => {
            const result = await onClick(state.value);
            if (result) {
              setSelectedState(state.value as QuestionState);
            }
          }}
        />
      ))}
    </StateSelecboxGroupContainer>
  );
};

export default StateSelecboxGroup;

const StateSelecboxGroupContainer = styled.div`
  display: flex;
  gap: 10px;
`;
