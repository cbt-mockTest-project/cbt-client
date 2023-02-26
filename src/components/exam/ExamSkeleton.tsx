import BasicBox from '@components/common/box/BasicBox';
import Label from '@components/common/label/Label';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { skeletonStyle } from '@styles/utils';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface ExamSkeletonProps {}

const ExamSkeleton: React.FC<ExamSkeletonProps> = () => {
  return (
    <ExamSkeletonContainer>
      <div className="exam-skeleton-container-title skeleton" />
      <div className="exam-skeleton-container-basic-box skeleton" />
      <div className="exam-skeleton-container-label skeleton" />
      <div className="exam-skeleton-container-basic-box skeleton" />
      <div className="exam-skeleton-container-label skeleton" />
      <div className="exam-skeleton-container-button-wrapper skeleton" />
    </ExamSkeletonContainer>
  );
};

export default ExamSkeleton;

const ExamSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  .skeleton {
    ${skeletonStyle}
  }
  .exam-skeleton-container-title {
    margin-bottom: 20px;
    width: 80%;
    max-width: 500px;
    height: 33px;
  }
  .exam-skeleton-container-basic-box {
    height: 100px;
  }
  .exam-skeleton-container-label {
    margin: 15px 0 2px 0;
    width: 60px;
    height: 20px;
  }
  .exam-skeleton-container-button-wrapper {
    margin-top: 10px;
    width: 100%;
    height: 40px;
  }

  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;
