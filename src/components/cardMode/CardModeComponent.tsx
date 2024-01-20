import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Virtual } from 'swiper/modules';
import { useRouter } from 'next/router';
import CardModeItem from './CardModeItem';
import StudyEnd from '@components/study/StudyEnd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const CardModeComponentBlock = styled.div`
  background-color: ${palette.colorContainerBgGrey};
  .swiper-slide {
    min-height: calc(100vh - 57px);
  }
  .card-mode-body {
    position: relative;
    padding: 20px;
    max-width: 1280px;
    min-height: calc(100vh - 57px);
    margin: 0 auto;
    cursor: grab;
  }
  .card-mode-navigation-prev,
  .card-mode-navigation-next {
    position: absolute;
    top: 15%;
    padding: 5px;
    margin: 0;
    border: 2px solid ${palette.colorBorder};
    color: ${palette.colorSubText};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${palette.antd_blue_02};
      border-color: ${palette.antd_blue_02};
    }
    svg {
      font-size: 30px;
    }
  }
  .card-mode-navigation-prev {
    left: -30px;
  }
  .card-mode-navigation-next {
    right: -30px;
  }
  .swiper-button-disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  @media (max-width: ${responsive.large}) {
    .card-mode-navigation-prev,
    .card-mode-navigation-next {
      display: none;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .card-mode-body {
      padding: 10px;
    }
  }
`;

interface CardModeComponentProps {}

const CardModeComponent: React.FC<CardModeComponentProps> = () => {
  const { questions } = useQuestions();
  const [swiper, setSwiper] = useState<any>(null);
  const router = useRouter();
  return (
    <CardModeComponentBlock>
      <div className="card-mode-body">
        <Swiper
          className="swiper-container"
          spaceBetween={20}
          modules={[Navigation, Virtual]}
          virtual={{
            slides: questions,
            cache: true,
            addSlidesBefore: 1,
            addSlidesAfter: 1,
          }}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
          onSlideChange={(swiper) => {
            router.replace({
              pathname: router.pathname,
              query: { ...router.query, qIndex: swiper.activeIndex },
            });
          }}
          navigation={{
            prevEl: '.card-mode-navigation-prev',
            nextEl: '.card-mode-navigation-next',
          }}
        >
          {swiper &&
            questions.map((question, index) => (
              <SwiperSlide key={question.id}>
                <CardModeItem
                  key={question.id}
                  question={question}
                  number={index + 1}
                  swiper={swiper}
                />
              </SwiperSlide>
            ))}
          {questions.length >= 1 && swiper && (
            <SwiperSlide key={-1}>
              <StudyEnd swiper={swiper} />
            </SwiperSlide>
          )}
        </Swiper>
        <button className="card-mode-navigation-prev">
          <LeftOutlined />
        </button>
        <button className="card-mode-navigation-next">
          <RightOutlined />
        </button>
      </div>
    </CardModeComponentBlock>
  );
};

export default CardModeComponent;
