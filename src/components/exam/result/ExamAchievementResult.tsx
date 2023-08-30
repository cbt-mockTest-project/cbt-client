import BasicBox from '@components/common/box/BasicBox';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import ExamAchievementResultList from '../common/ExamAchievementResultList';
import { questionsVar } from '../ExamComponent';
import { useAppSelector } from '@modules/redux/store/configureStore';

interface ExamAchievementResultProps {
  className?: string;
}

const ExamAchievementResult: React.FC<ExamAchievementResultProps> = ({
  className,
}) => {
  const questionList = useAppSelector((state) => state.exam.questionList);
  return (
    <ExamAchievementResultContainer
      className={`exam-result-achieve-check-box not-draggable ${className}`}
      maxHeight={280}
    >
      <ExamAchievementResultList
        className="exam-result-achieve-check-box-result-list"
        questionList={questionList}
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
  .exam-achievement-result-count-block {
    padding: 10px 20px;
  }
`;
