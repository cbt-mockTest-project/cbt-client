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

const MainBanner = () => {
  const isIosAndMobile = isIOS && window.innerWidth < 720;
  const { value: appGuideModalState, onToggle: onToggleAppGuideModal } =
    useToggle();
  return (
    <MainBannerContainer isIOS={isIOS}>
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
            <a
              href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1"
              target="_blank"
              rel="noreferrer"
            >
              <div className="home-main-banner-box" />
            </a>
          )}
        </SwiperSlide>
      </Swiper>
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
  }
`;
