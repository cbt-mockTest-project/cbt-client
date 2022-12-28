import { convertWithErrorHandlingFunc, extractCache } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { checkboxOption } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestion, QuestionState } from 'types';
import SquareSelectbox from './SquareSelectbox';

interface SquareSelectboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onClick: (value: checkboxOption['value']) => void;
  currentQuestionId: number;
}

interface SquareSelectboxGroupCssProps
  extends Pick<SquareSelectboxGroupProps, 'gap'> {}

const SquareSelectboxGroup: React.FC<SquareSelectboxGroupProps> = ({
  options,
  onClick,
  gap = 10,
  currentQuestionId,
}) => {
  const router = useRouter();
  const client = useApollo({}, '');
  const [selectedState, setSelectedState] = useState<string>(
    QuestionState.Core
  );
  const cachedCurrentQuestion = extractCache(
    client,
    `MockExamQuestion:${currentQuestionId}`
  ) as MockExamQuestion;
  useEffect(() => {
    if (cachedCurrentQuestion && cachedCurrentQuestion.state.length >= 1) {
      setSelectedState(cachedCurrentQuestion.state[0].state);
    }
  }, [router.query.q]);
  const requestOnclick = (value: string) => {
    onClick(value);
    setSelectedState(value);
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
            selected={option.value === selectedState}
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
