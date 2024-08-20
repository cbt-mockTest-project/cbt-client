import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import styled from 'styled-components';
import ObjectiveStudyOmrCardItem from './ObjectiveStudyOmrCardItem';
import QuestionStudyOmrCardHeader from './QuestionStudyOmrCardHeader';

const ObjectiveStudyOmrCardBlock = styled.div`
  min-width: 250px;
  max-width: 250px;
  background-color: ${({ theme }) => theme.color('colorFillSecondary')};
  overflow-y: auto;
  height: calc(100vh - 200px);
`;

interface ObjectiveStudyOmrCardProps {}

const ObjectiveStudyOmrCard: React.FC<ObjectiveStudyOmrCardProps> = () => {
  const questionIds = useAppSelector((state) =>
    state.mockExam.questions.map((question) => question.id)
  );
  return (
    <ObjectiveStudyOmrCardBlock>
      <QuestionStudyOmrCardHeader />
      {questionIds.map((questionId, index) => (
        <ObjectiveStudyOmrCardItem
          key={questionId}
          questionId={questionId}
          index={index + 1}
        />
      ))}
    </ObjectiveStudyOmrCardBlock>
  );
};

export default ObjectiveStudyOmrCard;
