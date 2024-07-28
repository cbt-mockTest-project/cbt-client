import useApolloClient from './useApolloCient';
import { App } from 'antd';
import {
  MockExamQuestion,
  QuestionState,
  ReadMockExamQuestionInput,
} from 'types';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import useQuestionFeedback, {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from './useQuestionFeedback';
import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { useQuery } from '@tanstack/react-query';
import {
  getQuestionKey,
  getQuestionQueryOption,
} from '@lib/queryOptions/getQuestionQueryOption';

const useQuestion = (questionQueryInput: ReadMockExamQuestionInput) => {
  const { message } = App.useApp();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const { refetch } = useQuery(
    getQuestionQueryOption({
      queryKey: getQuestionKey(questionQueryInput.questionId) as string[],
      input: questionQueryInput,
    })
  );
  const [changeQuestionState] = useChangeQuestionState();

  const {
    handleAddFeedback: addFeedback,
    handleDeleteFeedback: deleteFeedback,
    handleEditFeedback: editFeedback,
    handleUpdateFeedbackRecommendation: updateFeedbackRecommendation,
  } = useQuestionFeedback();

  const handleSaveQuestionState = async (
    question: MockExamQuestion,
    state: QuestionState
  ) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      await changeQuestionState({
        variables: {
          input: {
            questionId: question.id,
            state,
          },
        },
      });
      refetch();
    } catch {
      message.error('문제 상태 저장에 실패했습니다.');
    }
  };

  const handleDeleteFeedback = async ({
    question,
    feedback,
  }: Omit<DeleteFeedbackInput, 'setQuestion'>) => {
    deleteFeedback({
      question,
      setQuestion: () => {},
      feedback,
    });
    refetch();
  };
  const handleUpdateFeedbackRecommendation = async ({
    type,
    myRecommendationStatus,
    question,
    feedback,
  }: Omit<UpdateFeedbackRecommendationInput, 'setQuestion'>) => {
    updateFeedbackRecommendation({
      type,
      myRecommendationStatus,
      question,
      feedback,
    });
    refetch();
  };

  const handleAddFeedback = async (
    addFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => {
    addFeedback({
      ...addFeedbackInput,
    });
    refetch();
  };

  const handleEditFeedback = async (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => {
    editFeedback({
      ...editFeedbackInput,
    });
    refetch();
  };

  return {
    handleDeleteFeedback,
    handleUpdateFeedbackRecommendation,
    handleAddFeedback,
    handleSaveQuestionState,
    handleEditFeedback,
  };
};

export default useQuestion;
