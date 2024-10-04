import useQuestionsScore from '@lib/hooks/useQuestionsScore';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { App } from 'antd';
import { useRouter } from 'next/router';

const useObjectiveStudyHandler = () => {
  const router = useRouter();
  const { modal } = App.useApp();
  const isExistNotSolvedQuestion = useAppSelector(
    (state) =>
      !!state.mockExam.questions.find((question) => !question.myObjectiveAnswer)
  );
  const { handleResetQuestionState } = useQuestionsScore();

  const resetAnswers = () => {
    modal.confirm({
      title: '초기화 하시겠습니까?',
      onOk: () => {
        try {
          handleResetQuestionState();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const submitAnswers = () => {
    if (isExistNotSolvedQuestion) {
      modal.confirm({
        title: '알림',
        content: '풀지 않은 문제가 있습니다. 제출하시겠습니까?',
        cancelText: '계속 풀기',
        okText: '제출',
        onOk: async () => {
          delete router.query.dialog;
          await router.push({
            query: { ...router.query, step: 'end' },
          });
        },
      });
    } else {
      modal.confirm({
        title: '알림',
        content: '제출하시겠습니까?',
        onOk: async () => {
          await router.push({
            query: { ...router.query, step: 'end' },
          });
        },
      });
    }
  };
  return { resetAnswers, submitAnswers };
};

export default useObjectiveStudyHandler;
