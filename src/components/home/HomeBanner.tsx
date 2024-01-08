import { responsive } from '@lib/utils/responsive';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HomeBannerBlock = styled.div`
  .home-banner-image-swiper {
    .home-banner-image-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 1024 / 180;
    }
    .visible-on-pc {
      display: block;
    }
    .visible-on-mobile {
      display: none;
    }
  }
  .home-banner-image-swiper-mobile {
    display: none;
  }
  @media (max-width: ${responsive.small}) {
    .home-banner-image-swiper {
      .home-banner-image-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 2000 / 650;
      }
      .visible-on-pc {
        display: none;
      }
      .visible-on-mobile {
        display: block;
      }
    }
  }
`;

interface HomeBannerProps {}

const HomeBanner: React.FC<HomeBannerProps> = () => {
  const banners = [
    {
      img: {
        pc: '/png/banner/ehs-banner-pc01.png',
        mobile: '/png/banner/ehs-banner-mobile01.png',
      },
      link: 'https://ehs-master.com',
    },
  ];
  return (
    <HomeBannerBlock>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        modules={[Autoplay]}
        className="home-banner-image-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide
            key={banner.img.pc}
            className="home-banner-image-swiper-slide"
          >
            <div className="home-banner-image-wrapper visible-on-pc">
              <Image src={banner.img.pc} alt="배너" fill />
            </div>
            <div className="home-banner-image-wrapper visible-on-mobile">
              <Image src={banner.img.mobile} alt="배너" fill />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </HomeBannerBlock>
  );
};

export default HomeBanner;
