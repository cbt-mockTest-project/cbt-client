import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import SolutionModeCardItem from './SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { uniqueId } from 'lodash';

const SolutionModeCardItemListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

interface SolutionModeCardItemListProps {
  isAnswerAllHidden: boolean;
  isStaticPage?: boolean;
}

const SolutionModeCardItemList: React.FC<SolutionModeCardItemListProps> = ({
  isAnswerAllHidden,
  isStaticPage,
}) => {
  const serverSideQuestionLength = useAppSelector((state) =>
    state.mockExam.serverSideQuestions
      ? state.mockExam.serverSideQuestions.length
      : 0
  );
  const clientSideQuestionLength = useAppSelector((state) =>
    state.mockExam.questions ? state.mockExam.questions.length : 0
  );
  const questionLength = useMemo(
    () =>
      isStaticPage
        ? clientSideQuestionLength || serverSideQuestionLength
        : clientSideQuestionLength,
    [serverSideQuestionLength, clientSideQuestionLength, isStaticPage]
  );
  return (
    <SolutionModeCardItemListBlock>
      {Array.from({ length: questionLength }).map((_, index) => (
        <SolutionModeCardItem
          key={uniqueId()}
          isAnswerAllHidden={isAnswerAllHidden}
          index={index}
          isStaticPage={isStaticPage}
        />
      ))}
    </SolutionModeCardItemListBlock>
  );
};

export default SolutionModeCardItemList;
