import { IN_PROGRESS_ANSWERS } from '@lib/constants/localStorage';
import { AnimatePresence, motion } from 'framer-motion';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';
import useQuestions from '@lib/hooks/useQuestions';
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
import { isMobile } from 'react-device-detect';

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
  @media (max-width: ${responsive.large}) {
    .study-mode-navigation-prev,
    .study-mode-navigation-next,
    .study-mode-navigation-final {
      display: none;
    }
  }
`;

interface StudyModeWrapperProps {}

const StudyModeWrapper: React.FC<StudyModeWrapperProps> = () => {
  const localStorage = new LocalStorage();

  const [isGoogleAdModalOpen, setIsGoogleAdModalOpen] = useState(false);
  const router = useRouter();
  const { questions } = useQuestions();
  const [hasDefaultAnswers, setHasDefaultAnswers] = useState<boolean | null>(
    null
  );
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  const activeIndex = useMemo(() => {
    if (router.query.activeIndex === undefined) return 1;
    return Number(router.query.activeIndex);
  }, [router.query.activeIndex]);
  const mode = router.query.mode as string;
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  const { updateQuestionIndexInfo } = useCurrentQuestionIndex();

  useEffect(() => {
    updateQuestionIndexInfo(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (mode !== 'typing') return;
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
        setHasDefaultAnswers(false);
      },
      onCancel() {
        setHasDefaultAnswers(true);
      },
    });
  }, [mode]);

  useEffect(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (mode === 'card') {
      activeElement.blur();
    }
    const cardModeKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && e.shiftKey && e.altKey) {
        handleSlideNext(questions.length);
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
      if (e.key === ' ' && e.shiftKey && e.altKey) {
        const cardModeToggleAnswerButton = document.querySelector(
          '.card-mode-control-show-answer-button'
        ) as HTMLButtonElement;
        if (cardModeToggleAnswerButton) cardModeToggleAnswerButton.click();
        const typingModeToggleAnswerButton = document.querySelector(
          '.typing-mode-answer-visible-toggle-button'
        ) as HTMLButtonElement;
        if (typingModeToggleAnswerButton) typingModeToggleAnswerButton.click();
      }
    };
    window.addEventListener('keydown', cardModeKeydown);
    return () => {
      window.removeEventListener('keydown', cardModeKeydown);
    };
  }, [mode, activeIndex]);

  return (
    <AnimatePresence initial={false}>
      <StudyModeWrapperBlock>
        {router.query.tab !== 'end' && (
          <motion.div
            key={activeIndex}
            drag={isMobile ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleSlideNext(questions.length);
              } else if (swipe > swipeConfidenceThreshold) {
                handleSlidePrev();
              }
            }}
          >
            <StudyModeItemWrapper
              hasDefaultAnswers={hasDefaultAnswers}
              question={questions[activeIndex - 1]}
              number={activeIndex}
            />
          </motion.div>
        )}
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
                onClick={() => handleSlideNext(questions.length)}
              >
                <RightOutlined />
              </button>
            </Tooltip>
          </>
        )}
        {isGoogleAdModalOpen && (
          <GoogleAdModal onClose={() => setIsGoogleAdModalOpen(false)} />
        )}
      </StudyModeWrapperBlock>
    </AnimatePresence>
  );
};

export default StudyModeWrapper;
