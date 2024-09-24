import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';
import ObjectiveStudyTestModeItem from '../testMode/ObjectiveStudyTestModeItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { responsive } from '@lib/utils/responsive';

const ObjectiveStudyResultQuestionCardBlock = styled(Card)<{
  status: 'correct' | 'incorrect';
}>`
  border-color: ${({ theme, status }) =>
    status === 'correct'
      ? theme.color('colorPrimary')
      : theme.color('colorError')};

  .ant-card-body {
    padding: 24px 8px;
  }
`;

interface ObjectiveStudyResultQuestionCardProps {
  questionId: number;
  index: number;
}

const ObjectiveStudyResultQuestionCard: React.FC<
  ObjectiveStudyResultQuestionCardProps
> = ({ questionId, index }) => {
  const question = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );
  const status =
    question.myObjectiveAnswer === question.objectiveData.answer
      ? 'correct'
      : 'incorrect';
  return (
    <ObjectiveStudyResultQuestionCardBlock status={status}>
      <ObjectiveStudyTestModeItem
        questionId={questionId}
        index={index}
        isSolutionVisible
        readOnly
      />
    </ObjectiveStudyResultQuestionCardBlock>
  );
};

export default ObjectiveStudyResultQuestionCard;
