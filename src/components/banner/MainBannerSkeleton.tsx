import React from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { responsive } from '@lib/utils/responsive';
import { isIOS } from 'react-device-detect';
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
