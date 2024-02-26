import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IN_PROGRESS_ANSWERS } from '@lib/constants/localStorage';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';
import useQuestions from '@lib/hooks/useQuestions';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import StudyEnd from './StudyEnd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import { LocalStorage } from '@lib/utils/localStorage';
import StudyModeItemWrapper from './StudyModeItemWrapper';
import { getCookie } from 'cookies-next';
import { COUPANG_AD_COOKIE } from '@lib/constants/cookie';
import CoupangDisplayAdModal from '@components/common/ad/CoupangDisplayAdModal';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { isUndefined } from 'lodash';
import { checkRole } from '@lib/utils/utils';
import { isMobile } from 'react-device-detect';
import GoogleAdModal from '@components/common/ad/GoogleAdModal';
import { UserRole } from 'types';

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
  .study-mode-typing-slide {
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
  const { data: meQuery } = useMeQuery();
  const [isGoogleAdModalOpen, setIsGoogleAdModalOpen] = useState(false);
  const router = useRouter();
  const { questions } = useQuestions();
  const [clearPrevAnswers, setClearPrevAnswers] = useState(false);
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  const [swiper, setSwiper] = useState<any>(null);
  const mode = router.query.mode as string;
  const order = router.query.order as string;
  const examIds = useMemo(
    () => router.query.examIds || [router.query.examId],
    [router.query.examIds, router.query.examId]
  );
  const { findQuestionIndexInfo, updateQuestionIndexInfo } =
    useCurrentQuestionIndex();

  useEffect(() => {
    if (examIds.length > 1 || order) return;
    const currentQuestionInfo = findQuestionIndexInfo();
    if (swiper && currentQuestionInfo) {
      swiper.slideTo(currentQuestionInfo.questionIndex, 0);
    }
  }, [examIds, swiper, order]);

  useEffect(() => {
    if (mode !== 'typing') return;
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
  }, [questions, swiper, mode]);

  return (
    <StudyModeWrapperBlock>
      {router.query.tab !== 'end' && (
        <Swiper
          className="swiper-container"
          spaceBetween={20}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
          touchRatio={isMobile ? 1 : 0}
          onSlideChange={(swiper) => {
            router.replace({
              query: { ...router.query, activeIndex: swiper.activeIndex + 1 },
            });
            // const coupangAdCookie = getCookie(COUPANG_AD_COOKIE);
            // if (
            //   !coupangAdCookie &&
            //   !isUndefined(meQuery) &&
            //   !checkRole({ roleIds: [1, 2, 3, 4, 5, 6, 7], meQuery }) &&
            //   Math.random() < 0.5
            // ) {
            //   setIsCoupangAdModalOpen(true);
            // }
            updateQuestionIndexInfo(swiper.activeIndex);
            if (isUndefined(meQuery)) return;
            if (meQuery.me.user?.role === UserRole.Admin) {
              setIsGoogleAdModalOpen(true);
            }
          }}
        >
          {swiper &&
            questions.map((question, index) => (
              <SwiperSlide
                key={question.id}
                className={`${
                  mode === 'card'
                    ? 'study-mode-card-slide'
                    : 'study-mode-typing-slide'
                }`}
              >
                <StudyModeItemWrapper
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
            className="study-mode-navigation-prev"
            onClick={() => handleSlidePrev(swiper)}
          >
            <LeftOutlined />
          </button>
          <button
            className="study-mode-navigation-next"
            onClick={() => handleSlideNext(questions.length, swiper)}
          >
            <RightOutlined />
          </button>
        </>
      )}
      {isGoogleAdModalOpen && (
        <GoogleAdModal
          open={isGoogleAdModalOpen}
          onCancel={() => {
            setIsGoogleAdModalOpen(false);
          }}
        />
      )}
    </StudyModeWrapperBlock>
  );
};

export default StudyModeWrapper;
