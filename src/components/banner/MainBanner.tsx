import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { responsive } from '@lib/utils/responsive';

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
          <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=620466&template=carousel&trackingCode=AF8104485&subId=&width=1024&height=180"
            width="1024"
            height="180"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
          ></iframe>
        </SwiperSlide>
        <SwiperSlide>
          <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=620466&template=carousel&trackingCode=AF8104485&subId=&width=1024&height=180"
            width="1024"
            height="180"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
          ></iframe>
        </SwiperSlide>
        <SwiperSlide>
          <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=620466&template=carousel&trackingCode=AF8104485&subId=&width=1024&height=180"
            width="1024"
            height="180"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
          ></iframe>
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
  @media (max-width: ${responsive.medium}) {
    .home-main-banner-swiper {
      width: 100%;
      height: 180px;
    }
  }
`;
