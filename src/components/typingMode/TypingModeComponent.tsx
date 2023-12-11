import StudyHeader from '@components/study/StudyHeader';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReadQuestionsByExamIdsInput } from 'types';
import TypingModeItem from './TypingModeItem';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import {
  TYPING_MODE_NEXT_NAVIGATION,
  TYPING_MODE_PREV_NAVIGATION,
} from './typingMode';

const TypingModeComponentBlock = styled.div`
  background-color: ${palette.backgroundColor};
  .swiper-slide {
    min-height: calc(100vh - 57px);
  }
  .typing-mode-body {
    position: relative;
    padding: 20px;
    max-width: 1280px;
    min-height: calc(100vh - 57px);
    margin: 0 auto;
    cursor: grab;
  }
  .typing-mode-swiper-navigation-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
  }
  .swiper-button-prev {
    left: -40px;
  }
  .swiper-button-next {
    right: 0px;
  }
  .typing-mode-textarea {
    margin-top: 15px;
    font-size: 16px;
    padding: 10px 20px;
  }
  .typing-mode-answer-visible-toggle-button {
    margin-top: 10px;
  }
  .typing-mode-answer-box {
    margin-top: 10px;
  }
  .study-control-box {
    margin-top: 10px;
  }
  @media (max-width: ${responsive.large}) {
    .typing-mode-swiper-navigation-wrapper {
      display: none;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .typing-mode-body {
      padding: 10px;
    }
  }
`;

interface TypingModeComponentProps {
  questionsQueryInput: ReadQuestionsByExamIdsInput;
}

const TypingModeComponent: React.FC<TypingModeComponentProps> = ({
  questionsQueryInput,
}) => {
  const { questions, fetchQuestions } = useQuestions();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const router = useRouter();
  const questionIndex =
    typeof router.query.qIndex === 'string' ? Number(router.query.qIndex) : 0;
  useEffect(() => {
    fetchQuestions(questionsQueryInput);
  }, []);

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      console.log(swiper);
      swiper.slideTo(questionIndex);
    }
  }, [swiper, questionIndex]);

  return (
    <TypingModeComponentBlock>
      <StudyHeader questions={questions} />
      <div className="typing-mode-body">
        <Swiper
          className="swiper-container"
          spaceBetween={20}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setSwiper(swiper);
            swiper.slideTo(questionIndex);
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
                <TypingModeItem
                  question={question}
                  number={index + 1}
                  swiper={swiper}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </TypingModeComponentBlock>
  );
};

export default TypingModeComponent;
