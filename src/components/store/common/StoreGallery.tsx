import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import SwiperClass from 'swiper';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Image } from 'antd';

const StoreGalleryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  padding-bottom: 24px;
  position: relative;
  .swiper-slide {
    position: relative;
    aspect-ratio: 16 / 9; // always use 16/9 video
    container-type: size;
  }
  .preview-swiper {
    text-align: center;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    background-color: ${palette.gray_100};
    img {
      width: 100%;
      height: 300px;
      border-radius: 8px;
      object-fit: contain;
    }
    .swiper-slide {
      width: 100%;
      cursor: grab;
    }
  }
  .preview-thumb-swiper {
    width: 696px;
    .swiper-slide {
      cursor: pointer;
      border-radius: 4px;
      border-radius: 4px;
      width: 96px;
      height: 54px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        object-fit: cover;
      }
    }

    .custom-swiper-button-next {
      &::after {
        display: none;
      }
    }
    .swiper-slide-thumb-active {
      border: 2px solid black;
    }
  }
  .thumb-slider-nav-button-wrapper {
    position: absolute;
    bottom: 34px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .custom-swiper-button-prev,
  .custom-swiper-button-next {
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${palette.gray_100};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
  @media (max-width: ${responsive.medium}) {
    width: 100%;
    .preview-swiper {
      width: 100%;
      height: 100%;
      aspect-ratio: 944 / 531;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .preview-thumb-swiper {
      display: none;
    }
    .thumb-slider-nav-button-wrapper {
      display: none;
    }
  }
`;
interface StoreGalleryProps {
  images: string[];
}

const StoreGallery: React.FC<StoreGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  if (images.length === 0) return null;
  return (
    <StoreGalleryBlock>
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="preview-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt="item-image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={24}
        slidesPerView={7}
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="preview-thumb-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt="item-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </StoreGalleryBlock>
  );
};

export default StoreGallery;
