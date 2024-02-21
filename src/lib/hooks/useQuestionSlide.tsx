import { Modal } from 'antd';
import useCurrentQuestionIndex from './useCurrentQuestionIndex';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { useCallback } from 'react';

const useQuestionSlide = () => {
  const router = useRouter();
  const { checkIsLastQuestion, checkIsFirstQuestion } =
    useCurrentQuestionIndex();
  const handleSlideNext = (questionLength: number, swiper: any) => {
    if (checkIsLastQuestion(questionLength)) {
      Modal.destroyAll();
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
      return;
    }
    if (isMobile) {
      if (!swiper) return;
      swiper.slideNext({
        animation: false,
      });
    } else {
      router.replace({
        query: {
          ...router.query,
          activeIndex: Number(router.query.activeIndex) + 1,
        },
      });
    }
  };
  const handleSlidePrev = useCallback(
    (swiper) => {
      console.log('handleSlidePrev');
      console.log(checkIsFirstQuestion());
      if (checkIsFirstQuestion()) return;
      if (isMobile) {
        console.log('mobile');
        if (!swiper) return;
        swiper.slidePrev({
          animation: false,
        });
      } else {
        console.log('pc');
        console.log(Number(router.query.activeIndex) - 1);
        router.replace({
          query: {
            ...router.query,
            activeIndex: Number(router.query.activeIndex) - 1,
          },
        });
      }
    },
    [router.query.activeIndex, isMobile]
  );
  return {
    handleSlideNext,
    handleSlidePrev,
  };
};

export default useQuestionSlide;
