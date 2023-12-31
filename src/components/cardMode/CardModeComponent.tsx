import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import CardModeItem from './CardModeItem';
import StudyEnd from '@components/study/StudyEnd';

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
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
          onSlideChange={(swiper) => {
            router.replace({
              pathname: router.pathname,
              query: { ...router.query, qIndex: swiper.activeIndex },
            });
          }}
        >
          {swiper &&
            questions.map((question, index) => (
              <SwiperSlide key={question.id}>
                <CardModeItem
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
      </div>
    </CardModeComponentBlock>
  );
};

export default CardModeComponent;
