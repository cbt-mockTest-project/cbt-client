import { WatchQueryFetchPolicy } from '@apollo/client';
import { loginModal } from '@lib/constants';
import { useLazyReadQuestionsByExamIds } from '@lib/graphql/hook/useExamQuestion';
import { useEditQuestionBookmark } from '@lib/graphql/hook/useQuestionBookmark';

import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import { App } from 'antd';
import { useDispatch } from 'react-redux';
import {
  MockExamQuestion,
  QuestionState,
  ReadQuestionsByExamIdsInput,
} from 'types';
import useQuestionFeedback, {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from './useQuestionFeedback';

const useQuestions = () => {
  const { message } = App.useApp();
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();

  const [readQuestionsQuery] = useLazyReadQuestionsByExamIds();
  const [editBookmarkMutaion] = useEditQuestionBookmark();
  const [changeQuestionState] = useChangeQuestionState();

  const {
    handleAddFeedback,
    handleDeleteFeedback,
    handleEditFeedback,
    handleUpdateFeedbackRecommendation,
  } = useQuestionFeedback();

  const fetchQuestions = async (
    questionsQueryInput: ReadQuestionsByExamIdsInput,
    fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
  ) => {
    try {
      const res = await readQuestionsQuery({
        variables: {
          input: questionsQueryInput,
        },
        fetchPolicy,
      });

      if (res.data?.readQuestionsByExamIds.questions) {
        dispatch(
          mockExamActions.setQuestions(
            res.data.readQuestionsByExamIds.questions as MockExamQuestion[]
          )
        );
      }
    } catch (e) {
      handleError(e);
    }
  };

  const saveBookmark = async (question: MockExamQuestion) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      const newQuestion = {
        ...question,
        isBookmarked: !question.isBookmarked,
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      await editBookmarkMutaion({
        variables: {
          input: {
            questionId: question.id,
          },
        },
      });
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('북마크 저장에 실패했습니다.');
    }
  };

  const saveQuestionState = async (
    question: MockExamQuestion,
    state: QuestionState
  ) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      const newQuestion = {
        ...question,
        myQuestionState: state,
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      await changeQuestionState({
        variables: {
          input: {
            questionId: question.id,
            state,
          },
        },
      });
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('문제 상태 저장에 실패했습니다.');
    }
  };

  const shuffleQuestions = () => {
    dispatch(mockExamActions.shuffleQuestions());
  };

  const deleteFeedback = async ({
    question,
    feedback,
  }: Omit<DeleteFeedbackInput, 'setQuestion'>) => {
    handleDeleteFeedback({
      question,
      feedback,
      setQuestion: (question) =>
        dispatch(mockExamActions.setQuestion(question)),
    });
  };
  const updateFeedbackRecommendation = async ({
    type,
    myRecommendationStatus,
    question,
    feedback,
  }: Omit<UpdateFeedbackRecommendationInput, 'setQuestion'>) => {
    handleUpdateFeedbackRecommendation({
      type,
      myRecommendationStatus,
      question,
      feedback,
      setQuestion: (question) =>
        dispatch(mockExamActions.setQuestion(question)),
    });
  };

  const addFeedback = async (
    addFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => {
    handleAddFeedback({
      ...addFeedbackInput,
      setQuestion: (question) =>
        dispatch(mockExamActions.setQuestion(question)),
    });
  };

  const editFeedback = async (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => {
    handleEditFeedback({
      ...editFeedbackInput,
      setQuestion: (question) =>
        dispatch(mockExamActions.setQuestion(question)),
    });
  };

  const resetQuestions = () => {
    dispatch(mockExamActions.setQuestions([]));
  };

  const filterQuestions = (states: QuestionState[]) => {
    dispatch(mockExamActions.filterQuestions(states));
  };
  const setQuestions = (questions: MockExamQuestion[]) => {
    dispatch(mockExamActions.setQuestions(questions));
  };

  const setServerSideQuestions = (questions: MockExamQuestion[]) => {
    dispatch(mockExamActions.setServerSideQuestions(questions));
  };

  return {
    setServerSideQuestions,
    setQuestions,
    saveBookmark,
    fetchQuestions,
    saveQuestionState,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedbackRecommendation,
    resetQuestions,
    shuffleQuestions,
    filterQuestions,
  };
};

export default useQuestions;
