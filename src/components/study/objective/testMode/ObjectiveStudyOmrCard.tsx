import { responsive } from '@lib/utils/responsive';
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

  @media (max-width: ${responsive.medium}) {
    min-height: calc(100vh - 200px);
    height: 100%;
  }
`;

interface ObjectiveStudyOmrCardProps {
  hasToolbox?: boolean;
  title?: string;
  readonly?: boolean;
}

const ObjectiveStudyOmrCard: React.FC<ObjectiveStudyOmrCardProps> = ({
  hasToolbox = true,
  title,
  readonly = false,
}) => {
  const questionIds = useAppSelector((state) =>
    state.mockExam.questions.map((question) => question.id)
  );
  return (
    <ObjectiveStudyOmrCardBlock>
      <QuestionStudyOmrCardHeader hasToolbox={hasToolbox} title={title} />
      {questionIds.map((questionId, index) => (
        <ObjectiveStudyOmrCardItem
          key={questionId}
          questionId={questionId}
          index={index + 1}
          readonly={readonly}
        />
      ))}
    </ObjectiveStudyOmrCardBlock>
  );
};

export default ObjectiveStudyOmrCard;
