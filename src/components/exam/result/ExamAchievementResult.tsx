import BasicBox from '@components/common/box/BasicBox';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import ExamAchievementResultList from '../common/ExamAchievementResultList';

interface ExamAchievementResultProps {
  className?: string;
}

const ExamAchievementResult: React.FC<ExamAchievementResultProps> = ({
  className,
}) => {
  const router = useRouter();
  return (
    <ExamAchievementResultContainer
      className={`exam-result-achieve-check-box not-draggable ${className}`}
      maxHeight={280}
    >
      <ExamAchievementResultList
        examId={Number(router.query.e)}
        className="exam-result-achieve-check-box-result-list"
      />
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResult;

const ExamAchievementResultContainer = styled(BasicBox)`
  margin-top: 20px;
  .exam-result-achieve-check-box-result-list {
    width: 100%;
  }
`;
