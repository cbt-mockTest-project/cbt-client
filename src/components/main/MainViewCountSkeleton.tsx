import { skeletonStyle } from '@styles/utils';
import React from 'react';
import styled from 'styled-components';

interface MainViewCountSkeletonProps {}

const MainViewCountSkeleton: React.FC<MainViewCountSkeletonProps> = () => {
  return (
    <MainViewCountSkeletonContainer>
      <div className="home-visit-count-box" />
      <div className="home-visit-count-box" />
      <div className="home-visit-count-box" />
    </MainViewCountSkeletonContainer>
  );
};

export default MainViewCountSkeleton;

const MainViewCountSkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 32px;
  .home-visit-count-box {
    margin-top: 5px;
    flex: 1;
    text-align: right;
    font-size: 0.8rem;
    height: 20px;
    ${skeletonStyle}
  }
`;
