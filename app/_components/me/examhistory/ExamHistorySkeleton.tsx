import SkeletonBox from '../../common/skeleton/SkeletonBox';
import { responsive } from '../../../_lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';

const ExamHistorySkeleton: React.FC = () => {
  return (
    <ExamHistorySkeletonContainer>
      <div className="mypage-exam-list-wrapper">
        <ul>
          {[1, 2, 3, 4, 5, 6, 7].map((el, idx) => (
            <li key={el}>
              <SkeletonBox height="30px" width="80%" />
              <SkeletonBox height="30px" width="60%" />
              <SkeletonBox height="30px" width="40%" />
            </li>
          ))}
        </ul>
      </div>
    </ExamHistorySkeletonContainer>
  );
};

export default ExamHistorySkeleton;

const ExamHistorySkeletonContainer = styled.div`
  .mypage-exam-list-wrapper {
    li {
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      gap: 10px;
    }
  }

  @media (max-width: ${responsive.medium}) {
    padding: 0 15px;
    .mypage-exam-list-wrapper {
      margin-top: 20px;
    }
  }
`;
