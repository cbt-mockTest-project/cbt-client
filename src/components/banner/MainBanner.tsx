import React from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { responsive } from '@lib/utils/responsive';
import { isIOS } from 'react-device-detect';
import MouseIcon from '@mui/icons-material/Mouse';
import Portal from '@components/common/portal/Portal';
import IosAppGuideModal from '@components/common/modal/IosAppGuideModal';
import useToggle from '@lib/hooks/useToggle';
import palette from '@styles/palette';
import AdBannerInfoModal from '@components/common/modal/AdBannerInfoModal';
import Link from 'next/link';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';

const MainBanner = () => {
  const { value: openChatModalState, onToggle: onToggleOpenChatModal } =
    useToggle();
  const isIosAndMobile = isIOS && window.innerWidth < 720;
  const isMobile = window.innerWidth < 720;
  const { value: appGuideModalState, onToggle: onToggleAppGuideModal } =
    useToggle();
  return (
    <MainBannerContainer isIOS={isIOS}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={500}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
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
            onClick={onToggleOpenChatModal}
          >
            <div className="home-main-banner-box advertise" />
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

        <SwiperSlide>
          {isIosAndMobile ? (
            <div
              className="home-main-banner-box"
              onClick={onToggleAppGuideModal}
            >
              <div className="home-main-banner-content">
                <p className="home-main-banner-content-text">
                  {'모두CBT를 앱처럼\n사용해 보세요'}
                </p>
                <div className="home-main-banner-content-bottom">
                  <p>클릭!</p>
                  <MouseIcon />
                </div>
              </div>
              <Portal>
                <IosAppGuideModal
                  open={appGuideModalState}
                  onClose={onToggleAppGuideModal}
                />
              </Portal>
            </div>
          ) : (
            <>
              {isMobile ? (
                <Link href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1">
                  <div className="home-main-banner-box playstore" />
                </Link>
              ) : (
                <a
                  href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="home-main-banner-box playstore" />
                </a>
              )}
            </>
          )}
        </SwiperSlide>
      </Swiper>
      <Portal>
        {/* <AdBannerInfoModal
          open={openChatModalState}
          onClose={onToggleOpenChatModal}
        /> */}
        <KakaoOpenChatModal
          open={openChatModalState}
          onClose={onToggleOpenChatModal}
        />
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
  .home-main-banner-box.advertise {
    background-image: url('/png/banner/main-banner-pc04.png') !important;
  }
  .home-main-banner-box.ehsmaster {
    background-image: url('/png/banner/ehs-banner-pc01.png') !important;
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
    .home-main-banner-box.advertise {
      background-image: url('/png/banner/main-banner-mobile04.png') !important;
    }
    .home-main-banner-box.ehsmaster {
      background-image: url('/png/banner/ehs-banner-mobile01.png') !important;
    }
  }
`;
