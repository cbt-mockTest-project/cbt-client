import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HomeBannerBlock = styled.div`
  .home-banner-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1024 / 180;
  }
`;

interface HomeBannerProps {}

const HomeBanner: React.FC<HomeBannerProps> = () => {
  const banners = [
    {
      img: '/png/banner/ehs-banner-pc01.png',
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
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.img}>
            <div className="home-banner-image-wrapper">
              <Image src={banner.img} alt="배너" fill />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </HomeBannerBlock>
  );
};

export default HomeBanner;
