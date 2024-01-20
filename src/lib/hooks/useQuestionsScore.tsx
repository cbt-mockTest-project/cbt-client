import { useResetQuestionState } from '@lib/graphql/hook/useQuestionState';
import { handleError } from '@lib/utils/utils';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { QuestionState } from 'types';

const useQuestionsScore = () => {
  const dispatch = useAppDispatch();
  const [resetQuestionStateMutation] = useResetQuestionState();
  const questionsForScore = useAppSelector(
    (state) => state.mockExam.questionsForScore
  );

  const handleResetQuestionState = async () => {
    try {
      const res = await resetQuestionStateMutation({
        variables: {
          input: {
            questionIds: questionsForScore.map((question) => question.id),
          },
        },
      });
      if (res.data?.resetMyExamQuestionState.ok) {
        const newQuestions = questionsForScore.map((question) => ({
          ...question,
          myQuestionState: QuestionState.Core,
        }));
        dispatch(mockExamActions.setQuestions(newQuestions));
        dispatch(mockExamActions.setQuestionsForScore(newQuestions));
        return;
      }
      message.error(res.data?.resetMyExamQuestionState.error);
    } catch (e) {
      message.error('문제 상태 초기화에 실패했습니다.');
      handleError(e);
    }
  };
  return { questionsForScore, handleResetQuestionState };
};

export default useQuestionsScore;
