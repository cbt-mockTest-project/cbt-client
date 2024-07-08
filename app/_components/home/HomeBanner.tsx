import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OpenChatModal from '../common/layout/OpenChatModal';
import { responsive } from '../../_lib/utils/responsive';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import InquiryModal from './InquiryModal';

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
  const [isOpenChatModalOpen, setIsOpenChatModalOpen] = React.useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = React.useState(false);
  const banners = [
    {
      img: {
        pc: `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/banner/ehs-banner-pc03.png`,
        mobile: `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/banner/ehs-banner-mobile03.png`,
      },
      key: 'https://ehs-master.com',
    },
  ];
  const handleBannerClick = (key: string) => {
    if (key.startsWith('http')) {
      window.open(key, '_blank', 'noopener noreferrer');
      return;
    }
    if (key === 'open-chat') {
      setIsOpenChatModalOpen(true);
      return;
    }
    if (key === 'ad') {
      setIsInquiryModalOpen(true);
      return;
    }
  };
  return (
    <HomeBannerBlock>
      <Swiper
        autoplay={{
          delay: 3000,
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
            onClick={() => handleBannerClick(banner.key)}
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
      {isOpenChatModalOpen && (
        <OpenChatModal
          open={isOpenChatModalOpen}
          onCancel={() => setIsOpenChatModalOpen(false)}
        />
      )}
      {isInquiryModalOpen && (
        <InquiryModal
          open={isInquiryModalOpen}
          onCancel={() => setIsInquiryModalOpen(false)}
        />
      )}
    </HomeBannerBlock>
  );
};

export default HomeBanner;
