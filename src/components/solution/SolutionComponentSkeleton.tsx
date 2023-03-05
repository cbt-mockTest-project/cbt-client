import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import ExamSolutionListSkeleton from '@components/exam/solution/ExamSolutionListSkeleton';
import { responsive } from '@lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';

interface SolutionComponentSkeletonProps {}

const SolutionComponentSkeleton: React.FC<
  SolutionComponentSkeletonProps
> = () => {
  return (
    <SolutionComponentSkeletonContainer>
      <SkeletonBox
        width="130px"
        height="32px"
        className="exam-solution-page-solution-all-hide-button"
      />
      <SkeletonBox
        width="300px"
        height="33px"
        className="exam-solution-page-solution-all-hide-button"
      />
      <ul>
        {[1, 2, 3, 4, 5].map((el) => (
          <ExamSolutionListSkeleton key={el} />
        ))}
      </ul>
    </SolutionComponentSkeletonContainer>
  );
};

export default SolutionComponentSkeleton;

const SolutionComponentSkeletonContainer = styled.div`
  margin-bottom: 50px;
  padding: 20px;
  h1 {
    padding: 0px 20px 0px 0px;
    font-size: 1.3rem;
  }
  .exam-solution-page-solution-all-hide-button {
    margin-bottom: 10px;
  }
  @media (max-width: ${responsive.medium}) {
    h1 {
      font-size: 1.1rem;
    }
  }
  .solution-page-google-ad {
    margin-top: 20px;
  }
`;
