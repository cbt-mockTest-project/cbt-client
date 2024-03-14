import { skeletonStyle } from '@styles/utils';
import React from 'react';
import styled from 'styled-components';

interface MainViewCountSkeletonProps {}

const MainViewCountSkeleton: React.FC<MainViewCountSkeletonProps> = () => {
  return (
    <MainViewCountSkeletonContainer>
      <div className="home-visit-count-box" />
    </MainViewCountSkeletonContainer>
  );
};

export default MainViewCountSkeleton;

const MainViewCountSkeletonContainer = styled.div`
  margin-top: 20px;
  margin-left: 26px;
  width: 100px;
  .home-visit-count-box {
    height: 20px;
    ${skeletonStyle}
  }
`;
