import BasicBox from '@components/common/box/BasicBox';
import React from 'react';
import styled from 'styled-components';
import ExamAchievementResultList from '../common/ExamAchievementResultList';

interface ExamAchievementResultProps {
  className?: string;
}

const ExamAchievementResult: React.FC<ExamAchievementResultProps> = ({
  className,
}) => {
  return (
    <ExamAchievementResultContainer
      className={`exam-result-achieve-check-box not-draggable ${className}`}
      maxHeight={280}
    >
      <ExamAchievementResultList />
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResult;

const ExamAchievementResultContainer = styled(BasicBox)`
  margin-top: 20px;
`;
