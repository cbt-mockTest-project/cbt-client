import React from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { skeletonStyle } from '@styles/utils';

const MainBannerSkeleton = () => {
  return <MainBannerSkeletonContainer></MainBannerSkeletonContainer>;
};

export default MainBannerSkeleton;

const MainBannerSkeletonContainer = styled.div`
  width: 100%;
  height: 180px;
  ${skeletonStyle};
  @media (max-width: ${responsive.small}) {
    height: 140px;
  }
`;
