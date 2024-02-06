import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import TypingModeItem from './TypingModeItem';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import StudyEnd from '@components/study/StudyEnd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { LocalStorage } from '@lib/utils/localStorage';
import { IN_PROGRESS_ANSWERS } from '@lib/constants/localStorage';
import { Modal } from 'antd';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';

const TypingModeComponentBlock = styled.div`
  background-color: ${palette.colorContainerBgGrey};
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
  .typing-mode-navigation-prev,
  .typing-mode-navigation-next,
  .typing-mode-navigation-final {
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
  .typing-mode-navigation-prev {
    left: -30px;
  }
  .typing-mode-navigation-next,
  .typing-mode-navigation-final {
    right: -30px;
  }
  .swiper-button-disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  @media (max-width: ${responsive.large}) {
    .typing-mode-navigation-prev,
    .typing-mode-navigation-next,
    .typing-mode-navigation-final {
      display: none;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .typing-mode-body {
      padding: 10px;
    }
  }
`;

interface TypingModeComponentProps {}

const TypingModeComponent: React.FC<TypingModeComponentProps> = ({}) => {
  const { questions } = useQuestions();
  const localStorage = new LocalStorage();
  const [swiper, setSwiper] = useState<any | null>(null);
  const router = useRouter();
  const [clearPrevAnswers, setClearPrevAnswers] = useState(false);
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  const examIds = useMemo(
    () => router.query.examIds || [router.query.examId],
    [router.query.examIds, router.query.examId]
  );
  const order = router.query.order as string;
  const { findQuestionIndexInfo, updateQuestionIndexInfo } =
    useCurrentQuestionIndex();
  const questionIndex =
    typeof router.query.qIndex === 'string' ? Number(router.query.qIndex) : 0;

  useEffect(() => {
    // 다중선택모드일경우 리턴
    if (examIds.length > 1 || order) return;
    const currentQuestionInfo = findQuestionIndexInfo();
    if (swiper && currentQuestionInfo) {
      swiper.slideTo(currentQuestionInfo.questionIndex, 0);
    }
  }, [examIds, swiper, order]);

  useEffect(() => {
    if (!swiper) return;
    if (questions.length === 0) return;
    const inProgressAnswers = localStorage.get(IN_PROGRESS_ANSWERS);
    if (!inProgressAnswers) return;
    const validAnswers = Object.keys(inProgressAnswers).filter((key) =>
      questions.find((question) => question.id === Number(key))
    );
    if (validAnswers.length === 0) return;
    Modal.confirm({
      title: '이전에 작성한 답안이 남아 있습니다.',
      content: '작성중인 답안을 삭제하시겠습니까?',
      okText: '네',
      cancelText: '아니오',
      onOk() {
        localStorage.remove(IN_PROGRESS_ANSWERS);
        setClearPrevAnswers(true);
        setTimeout(() => {
          setClearPrevAnswers(false);
        }, 100);
      },
    });
  }, [questions, swiper]);

  return (
    <TypingModeComponentBlock>
      <div className="typing-mode-body">
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
                  <TypingModeItem
                    clearTextAreaTrigger={clearPrevAnswers}
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
              className={`typing-mode-navigation-prev`}
              onClick={() => {
                handleSlidePrev(swiper);
              }}
            >
              <LeftOutlined />
            </button>
            <button
              className={`typing-mode-navigation-next`}
              onClick={() => {
                handleSlideNext(questions.length, swiper);
              }}
            >
              <RightOutlined />
            </button>
          </>
        )}
      </div>
    </TypingModeComponentBlock>
  );
};

export default TypingModeComponent;
