import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { responsive } from '@lib/utils/responsive';
import Link from 'next/link';

const MainBanner = () => {
  return (
    <MainBannerContainer>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="home-main-banner-swiper"
      >
        <SwiperSlide>
          <Link href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1">
            <div className="home-main-banner-box" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </MainBannerContainer>
  );
};

export default MainBanner;

const MainBannerContainer = styled.div`
  .home-main-banner-swiper {
    width: 100%;
    height: 180px;
  }
  .home-main-banner-box {
    width: 100%;
    height: 100%;
    background-image: url('/png/banner/main-banner-pc02.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  @media (max-width: ${responsive.small}) {
    .home-main-banner-swiper {
      height: 140px;
    }
  }
  @media (max-width: 720px) {
    .home-main-banner-box {
      background-image: url('/png/banner/main-banner-mobile02.png') !important;
    }
  }
`;
