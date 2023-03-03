import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import React from 'react';
import styled from 'styled-components';

interface ExamSolutionListSkeletonProps {}

const ExamSolutionListSkeleton: React.FC<
  ExamSolutionListSkeletonProps
> = () => {
  return (
    <ExamSolutionListSkeletonContainer>
      <SkeletonBox
        className="exam-solution-list-skeleton-question"
        height="100px"
      />
      <SkeletonBox
        className="exam-solution-list-skeleton-solution"
        height="200px"
      />
      <SkeletonBox
        className="exam-solution-list-skeleton-button"
        height="30px"
      />
    </ExamSolutionListSkeletonContainer>
  );
};

export default ExamSolutionListSkeleton;

const ExamSolutionListSkeletonContainer = styled.li`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  .exam-solution-list-skeleton-solution {
    margin-top: 30px;
  }
  .exam-solution-list-skeleton-button {
    margin-top: 15px;
  }
`;
