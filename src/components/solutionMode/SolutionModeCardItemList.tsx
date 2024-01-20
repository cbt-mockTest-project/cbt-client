import React from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import SolutionModeCardItem from './SolutionModeCardItem';

const SolutionModeCardItemListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

interface SolutionModeCardItemListProps {
  defaultQuestions: MockExamQuestion[];
  isAnswerAllHidden: boolean;
}

const SolutionModeCardItemList: React.FC<SolutionModeCardItemListProps> = ({
  defaultQuestions,
  isAnswerAllHidden,
}) => {
  return (
    <SolutionModeCardItemListBlock>
      {defaultQuestions.map((question, index) => (
        <SolutionModeCardItem
          key={question.id}
          defaultQuestion={question as MockExamQuestion}
          isAnswerAllHidden={isAnswerAllHidden}
          index={index}
        />
      ))}
    </SolutionModeCardItemListBlock>
  );
};

export default SolutionModeCardItemList;
