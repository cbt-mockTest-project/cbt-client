import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { responsive } from '@lib/utils/responsive';
import { isIOS } from 'react-device-detect';
import Portal from '@components/common/portal/Portal';
import useToggle from '@lib/hooks/useToggle';
import palette from '@styles/palette';
import AdBannerInfoModal from '@components/common/modal/AdBannerInfoModal';
import Link from 'next/link';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';

const MainBanner = () => {
  const { value: openChatModalState, onToggle: onToggleOpenChatModal } =
    useToggle();
  const { value: inquiryModalState, onToggle: onToggleInquiryModalState } =
    useToggle();

  const isMobile = window.innerWidth < 720;

  return (
    <MainBannerContainer isIOS={isIOS}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // modules={[Autoplay, Pagination]}
        className="home-main-banner-swiper"
      >
        <SwiperSlide>
          <Link href="https://ehs-master.com/" target="_blank" rel="noreferrer">
            <div className="home-main-banner-box ehsmaster" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="main-banner-text-banner"
            onClick={onToggleInquiryModalState}
          >
            <div className="home-main-banner-box advertise" />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="main-banner-text-banner"
            onClick={onToggleOpenChatModal}
          >
            <div className="home-main-banner-box bot" />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          {isMobile ? (
            <Link href="https://zep.us/play/8MOQrp">
              <div className="home-main-banner-box zep" />
            </Link>
          ) : (
            <a
              href="https://zep.us/play/8MOQrp"
              target="_blank"
              rel="noreferrer"
            >
              <div className="home-main-banner-box zep" />
            </a>
          )}
        </SwiperSlide>
      </Swiper>
      <Portal>
        {inquiryModalState && (
          <AdBannerInfoModal
            open={inquiryModalState}
            onClose={onToggleInquiryModalState}
          />
        )}
        {openChatModalState && (
          <KakaoOpenChatModal
            open={openChatModalState}
            onClose={onToggleOpenChatModal}
          />
        )}
      </Portal>
    </MainBannerContainer>
  );
};

export default MainBanner;

interface MainBannerContainerProps {
  isIOS: boolean;
}
const MainBannerContainer = styled.div<MainBannerContainerProps>`
  .home-main-banner-swiper {
    width: 100%;
    height: 180px;
    .swiper-pagination {
      top: 0;
      text-align: right;
      height: 20px;
      margin-right: 20px;
    }
  }
  .home-main-banner-box {
    width: 100%;
    height: 100%;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    ${(props) =>
      props.isIOS
        ? css`
            background-image: url('/png/banner/main-banner-pc01.png');
          `
        : css`
            background-image: url('/png/banner/main-banner-pc02.png');
          `}
  }
  .home-main-banner-box.zep {
    background-image: url('/png/banner/main-banner-zep-pc01.png');
  }
  .home-main-banner-box.bot {
    background-image: url('/png/banner/main-banner-pc04.png') !important;
  }
  .home-main-banner-box.ehsmaster {
    background-image: url('/png/banner/ehs-banner-pc01.png') !important;
  }
  .home-main-banner-box.advertise {
    background-image: url('/png/banner/ad-banner-pc01.png') !important;
  }
  .main-banner-text-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${palette.gray_100};
  }
  .main-banner-text-banner-icon-wrapper {
    display: flex;
    align-items: center;
    .main-banner-text-banner-icon {
      position: relative;
      left: 5px;
      top: 4px;
    }
  }

  @media (max-width: ${responsive.small}) {
    .home-main-banner-swiper {
      height: 140px;
    }
  }
  @media (max-width: 720px) {
    .home-main-banner-box {
      ${(props) =>
        props.isIOS
          ? css`
              .home-main-banner-content {
                padding: 20px;
                font-size: 1.4rem;
                color: white;
                z-index: 10;
                height: 100%;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.2);
              }
              .home-main-banner-content-text {
                white-space: pre-line;
              }
              .home-main-banner-content-bottom {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 5px;
              }
              background-image: url('/png/banner/main-banner-mobile-ios01.png') !important;
            `
          : css`
              background-image: url('/png/banner/main-banner-mobile02.png') !important;
            `}
    }
    .home-main-banner-box.zep {
      background-image: url('/png/banner/main-banner-zep-mobile01.png') !important;
    }
    .home-main-banner-box.bot {
      background-image: url('/png/banner/main-banner-mobile04.png') !important;
    }
    .home-main-banner-box.advertise {
      background-image: url('/png/banner/ad-banner-mobile01.png') !important;
    }
    .home-main-banner-box.ehsmaster {
      background-image: url('/png/banner/ehs-banner-mobile01.png') !important;
    }
  }
`;
