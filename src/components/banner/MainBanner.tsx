import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { responsive } from '@lib/utils/responsive';
import Image from 'next/image';

const MainBanner = () => {
  return (
    <MainBannerContainer>
      {/* <Swiper
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
      > */}
      {/* <SwiperSlide className="main-banner tablet"> */}
      <picture className="slider-image-picture">
        <source
          media="(max-width:500px)"
          srcSet="/banner/main-banner01-mobile.png"
        />
        <source
          media="(max-width:1024px)"
          srcSet="/banner/main-banner01-tablet.png"
        />
        <source
          media="(min-width:1024px)"
          srcSet="/banner/main-banner01-pc.png"
        />
      </picture>
      {/* </SwiperSlide> */}
      {/* </Swiper> */}
    </MainBannerContainer>
  );
};

export default MainBanner;

const MainBannerContainer = styled.div`
  height: 300px;
  .slider-image-picture {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    source,
    img {
      object-fit: cover;
      width: 100%;
      height: 200px;

      @media (max-width: ${responsive.medium}) {
        height: 166px;
      }

      @media (max-width: 685px) {
        height: 120px;
      }
    }
  }
  .home-main-banner-swiper {
    width: 100%;
    height: 180px;
  }
  @media (max-width: ${responsive.medium}) {
    .home-main-banner-swiper {
      width: 100%;
      height: 180px;
    }
  }
`;
