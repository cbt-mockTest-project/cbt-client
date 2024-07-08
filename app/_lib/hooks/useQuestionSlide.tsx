import { App } from 'antd';
import useCurrentQuestionIndex from './useCurrentQuestionIndex';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useQuestionSlide = () => {
  const { modal } = App.useApp();
  const router = useRouter();
  const activeIndex = useMemo(() => {
    if (router.query.activeIndex === undefined) return 1;
    return Number(router.query.activeIndex);
  }, [router.query.activeIndex]);
  const { checkIsLastQuestion } = useCurrentQuestionIndex();
  const handleSlideNext = (questionLength: number) => {
    if (checkIsLastQuestion(questionLength)) {
      modal.confirm({
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
    router.replace({
      query: { ...router.query, activeIndex: activeIndex + 1 },
    });
  };
  const handleSlidePrev = () => {
    if (activeIndex === 1) return;
    router.replace({
      query: { ...router.query, activeIndex: activeIndex - 1 },
    });
  };
  return {
    handleSlideNext,
    handleSlidePrev,
  };
};

export default useQuestionSlide;
