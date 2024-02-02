import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import CardModeItem from './CardModeItem';
import StudyEnd from '@components/study/StudyEnd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';

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
  const examIds = useMemo(
    () => router.query.examIds || [router.query.examId],
    [router.query.examIds, router.query.examId]
  );
  const order = router.query.order as string;
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  const { findQuestionIndexInfo, updateQuestionIndexInfo } =
    useCurrentQuestionIndex();

  useEffect(() => {
    // 다중선택모드일경우 리턴
    if (examIds.length > 1 || order) return;
    const currentQuestionInfo = findQuestionIndexInfo();
    if (swiper && currentQuestionInfo) {
      swiper.slideTo(currentQuestionInfo.questionIndex, 0);
    }
  }, [examIds, swiper, order]);

  return (
    <CardModeComponentBlock>
      <div className="card-mode-body">
        {router.query.tab !== 'end' && (
          <Swiper
            className="swiper-container"
            spaceBetween={20}
            modules={[Navigation]}
            onSwiper={(swiper) => {
              setSwiper(swiper);
            }}
            onSlideChange={(swiper) => {
              updateQuestionIndexInfo(swiper.activeIndex);
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
            <button
              className="card-mode-navigation-prev"
              onClick={() => handleSlidePrev(swiper)}
            >
              <LeftOutlined />
            </button>
            <button
              className="card-mode-navigation-next"
              onClick={() => handleSlideNext(questions.length, swiper)}
            >
              <RightOutlined />
            </button>
          </>
        )}
      </div>
    </CardModeComponentBlock>
  );
};

export default CardModeComponent;
