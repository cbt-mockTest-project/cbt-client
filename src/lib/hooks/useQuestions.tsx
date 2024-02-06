import { WatchQueryFetchPolicy } from '@apollo/client';
import { loginModal } from '@lib/constants';
import { useLazyReadQuestionsByExamIds } from '@lib/graphql/hook/useExamQuestion';
import { useEditQuestionBookmark } from '@lib/graphql/hook/useQuestionBookmark';

import {
  useChangeQuestionState,
  useResetQuestionState,
} from '@lib/graphql/hook/useQuestionState';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { message } from 'antd';
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
import { useMemo } from 'react';

const useQuestions = () => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();
  const questions = useAppSelector((state) => state.mockExam.questions);
  const serverSideQuestions = useAppSelector(
    (state) => state.mockExam.serverSideQuestions
  );

  const questionsWithLowScore = useMemo(
    () =>
      questions.filter(
        (question) => question.myQuestionState === QuestionState.Row
      ),
    [questions]
  );
  const [readQuestionsQuery] = useLazyReadQuestionsByExamIds();
  const [editBookmarkMutaion] = useEditQuestionBookmark();
  const [changeQuestionState] = useChangeQuestionState();
  const [resetQuestionStateMutation] = useResetQuestionState();

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

  const resetQuestionState = async () => {
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
        }));
        dispatch(mockExamActions.setQuestions(newQuestions));
        return;
      }
      message.error(res.data?.resetMyExamQuestionState.error);
    } catch (e) {
      message.error('문제 상태 초기화에 실패했습니다.');
      handleError(e);
    }
  };

  const shuffleQuestions = () => {
    const mixedQuestions = [...questions];
    dispatch(
      mockExamActions.setQuestions(
        mixedQuestions.sort(() => Math.random() - 0.5)
      )
    );
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
    const newQuestions = questions.filter((question) =>
      states.includes(question.myQuestionState)
    );
    dispatch(mockExamActions.setQuestions(newQuestions));
  };
  const setQuestions = (questions: MockExamQuestion[]) => {
    dispatch(mockExamActions.setQuestions(questions));
  };

  const setServerSideQuestions = (questions: MockExamQuestion[]) => {
    dispatch(mockExamActions.setServerSideQuestions(questions));
  };

  return {
    questions,
    serverSideQuestions,
    setServerSideQuestions,
    setQuestions,
    saveBookmark,
    fetchQuestions,
    saveQuestionState,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedbackRecommendation,
    resetQuestionState,
    resetQuestions,
    shuffleQuestions,
    filterQuestions,
    questionsWithLowScore,
  };
};

export default useQuestions;
