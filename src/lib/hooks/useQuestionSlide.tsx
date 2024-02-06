import { Modal } from 'antd';
import useCurrentQuestionIndex from './useCurrentQuestionIndex';
import { useRouter } from 'next/router';

const useQuestionSlide = () => {
  const router = useRouter();
  const { checkIsLastQuestion } = useCurrentQuestionIndex();
  const handleSlideNext = (questionLength: number, swiper: any) => {
    if (checkIsLastQuestion(questionLength)) {
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
    swiper.slideNext({
      animation: false,
    });
  };
  const handleSlidePrev = (swiper: any) => {
    swiper.slidePrev({
      animation: false,
    });
  };
  return {
    handleSlideNext,
    handleSlidePrev,
  };
};

export default useQuestionSlide;
