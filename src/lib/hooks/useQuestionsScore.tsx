import { useResetQuestionState } from '@lib/graphql/hook/useQuestionState';
import { handleError } from '@lib/utils/utils';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { App } from 'antd';
import { QuestionState } from 'types';

const useQuestionsScore = () => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const [resetQuestionStateMutation] = useResetQuestionState();
  const questions = useAppSelector((state) => state.mockExam.questions);

  const handleResetQuestionState = async () => {
    try {
      const res = await resetQuestionStateMutation({
        variables: {
          input: {
            questionIds: questions.map((question) => question.id),
          },
        },
      });
      if (res.data?.resetMyExamQuestionState.ok) {
        const newQuestions = questions.map((question) => ({
          ...question,
          myQuestionState: QuestionState.Core,
          myObjectiveAnswer: 0,
        }));
        dispatch(mockExamActions.setQuestions(newQuestions));
        return;
      }
    } catch (e) {
      message.error('문제 상태 초기화에 실패했습니다.');
      handleError(e);
    }
  };
  return { questions, handleResetQuestionState };
};

export default useQuestionsScore;
