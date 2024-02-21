import { CURRENT_QUESTION_INDEX_LIST } from '@lib/constants/sessionStorage';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { useRouter } from 'next/router';

interface CurrentQuestionIndexType {
  questionIndex: number;
  examIds: number[];
}

const useCurrentQuestionIndex = () => {
  const router = useRouter();
  const sessionStorage = new SessionStorage();
  const examIds = router.query.examIds || [router.query.examId];

  const getQuestionIndexInfoList = (): CurrentQuestionIndexType[] => {
    return sessionStorage.get(CURRENT_QUESTION_INDEX_LIST) || [];
  };

  const findQuestionIndexInfo = (): CurrentQuestionIndexType | undefined => {
    return getQuestionIndexInfoList().find((el) => {
      return JSON.stringify(el.examIds) === JSON.stringify(examIds);
    });
  };

  const checkIsLastQuestion = (questionLength: number) => {
    const currentQuestionInfo = findQuestionIndexInfo();
    if (currentQuestionInfo?.questionIndex + 1 === questionLength) {
      return true;
    }
    return false;
  };

  const checkIsFirstQuestion = () => {
    const currentQuestionInfo = findQuestionIndexInfo();
    if (currentQuestionInfo?.questionIndex === 0) {
      return true;
    }
    return false;
  };

  const updateQuestionIndexInfo = (questionIndex: number) => {
    const currentQuestionInfo = findQuestionIndexInfo();
    const questionIndexInfo = {
      questionIndex,
      examIds,
    };
    if (currentQuestionInfo) {
      const updatedQuestionIndexInfoList = getQuestionIndexInfoList().map(
        (el) => {
          if (JSON.stringify(el.examIds) === JSON.stringify(examIds)) {
            return questionIndexInfo;
          }
          return el;
        }
      );
      sessionStorage.set(
        CURRENT_QUESTION_INDEX_LIST,
        updatedQuestionIndexInfoList
      );
    } else {
      sessionStorage.set(CURRENT_QUESTION_INDEX_LIST, [
        ...getQuestionIndexInfoList(),
        questionIndexInfo,
      ]);
    }
  };

  return {
    findQuestionIndexInfo,
    checkIsLastQuestion,
    updateQuestionIndexInfo,
    checkIsFirstQuestion,
  };
};

export default useCurrentQuestionIndex;
