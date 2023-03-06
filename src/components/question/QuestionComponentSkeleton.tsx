import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import ExamSolutionListSkeleton from '@components/exam/solution/ExamSolutionListSkeleton';
import React from 'react';
import styled from 'styled-components';

interface QuestionComponentSkeletonProps {}

const QuestionComponentSkeleton: React.FC<
  QuestionComponentSkeletonProps
> = ({}) => {
  return (
    <QuestionComponentSkeletonContainer>
      <SkeletonBox height="25px" width="300px" />
      <ExamSolutionListSkeleton />
    </QuestionComponentSkeletonContainer>
  );
};

export default QuestionComponentSkeleton;

const QuestionComponentSkeletonContainer = styled.div`
  padding: 20px;
`;
