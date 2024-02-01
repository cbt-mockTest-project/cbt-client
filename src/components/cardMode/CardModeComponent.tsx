import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Virtual } from 'swiper/modules';
import { useRouter } from 'next/router';
import CardModeItem from './CardModeItem';
import StudyEnd from '@components/study/StudyEnd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

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
  .card-mode-navigation-next,
  .card-mode-navigation-final {
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
  .card-mode-navigation-next,
  .card-mode-navigation-final {
    right: -30px;
  }

  .swiper-button-disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  @media (max-width: ${responsive.large}) {
    .card-mode-navigation-prev,
    .card-mode-navigation-next,
    .card-mode-navigation-final {
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
  const qIndex =
    typeof router.query.qIndex === 'string' ? Number(router.query.qIndex) : 0;
  const handleFinalClick = () => {
    Modal.confirm({
      title: '학습을 종료하시겠습니까?',
      okText: '종료',
      cancelText: '취소',
      onOk: () => {
        router.replace({
          pathname: router.pathname,
          query: { ...router.query, tab: 'end' },
        });
      },
    });
  };
  return (
    <CardModeComponentBlock>
      <div className="card-mode-body">
        {router.query.tab !== 'end' && (
          <Swiper
            className="swiper-container"
            spaceBetween={20}
            modules={[Navigation, Virtual]}
            virtual={{
              slides: questions,
              addSlidesBefore: 3,
              addSlidesAfter: 3,
              cache: true,
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
          </Swiper>
        )}
        {router.query.tab === 'end' && <StudyEnd />}
        {router.query.tab !== 'end' && (
          <>
            <button className="card-mode-navigation-prev">
              <LeftOutlined />
            </button>
            <button className="card-mode-navigation-next">
              <RightOutlined />
            </button>
            {qIndex + 1 === questions.length && (
              <button
                className="card-mode-navigation-final"
                disabled={false}
                onClick={handleFinalClick}
              >
                <RightOutlined />
              </button>
            )}
          </>
        )}
      </div>
    </CardModeComponentBlock>
  );
};

export default CardModeComponent;
