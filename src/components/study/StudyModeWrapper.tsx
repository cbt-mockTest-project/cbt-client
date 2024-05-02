import 'swiper/css';
import { IN_PROGRESS_ANSWERS } from '@lib/constants/localStorage';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';
import { Modal, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import StudyEnd from './StudyEnd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import { LocalStorage } from '@lib/utils/localStorage';
import GoogleAdModal from '@components/common/ad/GoogleAdModal';
import StudyModeItemWrapper from './StudyModeItemWrapper';
import { useUpsertRecentlyStudiedExams } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isMobile } from 'react-device-detect';
import StudyModeCore from './StudyModeCore';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';

const StudyModeWrapperBlock = styled.div`
  .swiper-slide {
    min-height: calc(100vh - 57px);
  }

  .study-mode-body {
    min-height: calc(100vh - 57px);
    cursor: grab;
  }
  .study-mode-navigation-prev,
  .study-mode-navigation-next,
  .study-mode-navigation-final {
    position: absolute;
    top: 100px;
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
  .study-mode-navigation-prev {
    left: -30px;
  }
  .study-mode-navigation-next,
  .study-mode-navigation-final {
    right: -30px;
  }

  .swiper-button-disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  .typing-mode-swiper-button-wrapper {
    display: none;
  }
  @media (max-width: ${responsive.large}) {
    .study-mode-navigation-prev,
    .study-mode-navigation-next,
    .study-mode-navigation-final {
      display: none;
    }
    .swiper-slide-next,
    .swiper-slide-prev {
      max-height: 0;
      height: 0;
      min-height: 0;
    }
    .typing-mode-swiper-button-wrapper {
      z-index: 100;
      box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.1);
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      bottom: 0;
      padding: 10px 20px;
      width: 100%;
      right: 0;
      .typing-mode-control-button {
        background-color: white;
        padding: 5px;
        width: 40px;
        height: 40px;
        border: 2px solid ${palette.colorBorder};
        color: ${palette.colorText};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: ${palette.antd_blue_02};
        }
        svg {
          font-size: 20px;
        }
      }
    }
  }
`;

interface StudyModeWrapperProps {}

const StudyModeWrapper: React.FC<StudyModeWrapperProps> = () => {
  const questionsLength = useAppSelector(
    (state) => state.mockExam.questions.length
  );
  const [isGoogleAdModalOpen, setIsGoogleAdModalOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [hasDefaultAnswers, setHasDefaultAnswers] = useState<boolean | null>(
    null
  );
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  const [upsertRecentlyStudiedExams] = useUpsertRecentlyStudiedExams();
  const activeIndex = useMemo(() => {
    if (router.query.activeIndex === undefined) return 1;
    return Number(router.query.activeIndex);
  }, [router.query.activeIndex]);
  const mode = router.query.mode as string;
  const examId = router.query.examId as string;
  const tab = router.query.tab as string;
  const { updateQuestionIndexInfo } = useCurrentQuestionIndex();

  useEffect(() => {
    updateQuestionIndexInfo(activeIndex);
    if (
      isLoggedIn &&
      typeof examId === 'string' &&
      tab !== 'end' &&
      router.query.categoryId &&
      examId
    ) {
      try {
        upsertRecentlyStudiedExams({
          variables: {
            input: {
              categoryId: Number(router.query.categoryId),
              examIds: [Number(examId)],
              questionIndex: activeIndex,
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [activeIndex, isLoggedIn, examId, tab]);

  useEffect(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (mode === 'card') {
      activeElement.blur();
    }
    const cardModeKeydown = (e: KeyboardEvent) => {
      if (e.key === ' ' && e.shiftKey) {
        const cardModeToggleAnswerButton = document.querySelector(
          '.card-mode-control-show-answer-button'
        ) as HTMLButtonElement;
        if (cardModeToggleAnswerButton) cardModeToggleAnswerButton.click();
        const typingModeToggleAnswerButton = document.querySelector(
          '.typing-mode-answer-visible-toggle-button'
        ) as HTMLButtonElement;
        if (typingModeToggleAnswerButton) typingModeToggleAnswerButton.click();
      }
      if (e.key === 'ArrowRight' && e.shiftKey && e.altKey) {
        handleSlideNext(questionsLength);
      }
      if (e.key === 'ArrowLeft' && e.shiftKey && e.altKey) {
        handleSlidePrev();
      }
      if (e.shiftKey && e.code === 'KeyA' && e.altKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const highButton = document.querySelector(
          '.study-control-button.high'
        ) as HTMLButtonElement;
        if (highButton) highButton.click();
      }
      if (e.shiftKey && e.code === 'KeyS' && e.altKey) {
        e.preventDefault();
        const middleButton = document.querySelector(
          '.study-control-button.middle'
        ) as HTMLButtonElement;
        if (middleButton) middleButton.click();
      }
      if (e.shiftKey && e.code === 'KeyD' && e.altKey) {
        e.preventDefault();
        const lowButton = document.querySelector(
          '.study-control-button.low'
        ) as HTMLButtonElement;
        if (lowButton) lowButton.click();
      }
    };
    window.addEventListener('keydown', cardModeKeydown);
    return () => {
      window.removeEventListener('keydown', cardModeKeydown);
    };
  }, [mode, activeIndex]);

  return (
    <StudyModeWrapperBlock>
      {router.query.tab !== 'end' &&
        (isMobile ? (
          <Swiper
            initialSlide={1}
            direction="horizontal"
            threshold={10}
            touchRatio={0.8}
            longSwipes={false}
            shortSwipes={false}
            onTouchEnd={(e) => {
              if (e.touches.startX - e.touches.currentX > 100) {
                handleSlideNext(questionsLength);
              }
              if (e.touches.startX - e.touches.currentX < -100) {
                handleSlidePrev();
              }
            }}
          >
            <SwiperSlide />
            <SwiperSlide>
              <StudyModeItemWrapper
                key={activeIndex}
                hasDefaultAnswers={hasDefaultAnswers}
                number={activeIndex}
              />
            </SwiperSlide>
            <SwiperSlide />
            {mode === 'typing' && (
              <div className="typing-mode-swiper-button-wrapper">
                <Tooltip title={isMobile ? '' : 'alt + shift + <-'}>
                  <button
                    className="typing-mode-control-button"
                    onClick={() => handleSlidePrev()}
                  >
                    <LeftOutlined />
                  </button>
                </Tooltip>
                <Tooltip title={isMobile ? '' : 'alt + shift + ->'}>
                  <button
                    className="typing-mode-control-button"
                    onClick={() => handleSlideNext(questionsLength)}
                  >
                    <RightOutlined />
                  </button>
                </Tooltip>
              </div>
            )}
          </Swiper>
        ) : (
          <>
            <StudyModeItemWrapper
              key={activeIndex}
              hasDefaultAnswers={hasDefaultAnswers}
              number={activeIndex}
            />
            {mode === 'typing' && (
              <div className="typing-mode-swiper-button-wrapper">
                <Tooltip title={isMobile ? '' : 'alt + shift + <-'}>
                  <button
                    className="typing-mode-control-button"
                    onClick={() => handleSlidePrev()}
                  >
                    <LeftOutlined />
                  </button>
                </Tooltip>
                <Tooltip title={isMobile ? '' : 'alt + shift + ->'}>
                  <button
                    className="typing-mode-control-button"
                    onClick={() => handleSlideNext(questionsLength)}
                  >
                    <RightOutlined />
                  </button>
                </Tooltip>
              </div>
            )}
          </>
        ))}
      {router.query.tab === 'end' && <StudyEnd />}
      {router.query.tab !== 'end' && (
        <>
          <Tooltip title="alt + shift + <-">
            <button
              className="study-mode-navigation-prev"
              onClick={() => handleSlidePrev()}
            >
              <LeftOutlined />
            </button>
          </Tooltip>
          <Tooltip title="alt + shift + ->">
            <button
              className="study-mode-navigation-next"
              onClick={() => handleSlideNext(questionsLength)}
            >
              <RightOutlined />
            </button>
          </Tooltip>
        </>
      )}
      {isGoogleAdModalOpen && (
        <GoogleAdModal onClose={() => setIsGoogleAdModalOpen(false)} />
      )}
      <StudyModeCore setHasDefaultAnswers={setHasDefaultAnswers} />
    </StudyModeWrapperBlock>
  );
};

export default StudyModeWrapper;
