import { WatchQueryFetchPolicy } from '@apollo/client';
import { loginModal } from '@lib/constants';
import { useLazyReadQuestionsByExamIds } from '@lib/graphql/hook/useExamQuestion';
import { useEditQuestionBookmark } from '@lib/graphql/hook/useQuestionBookmark';

import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import {
  createQuestionBookmarkMutationFn,
  deleteQuestionBookmarkMutationFn,
  moveQuestionBookmarkMutationFn,
} from '@lib/mutation/questionBookmarkMutation';
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

export type HandleSaveBookmark = (
  question: MockExamQuestion,
  folderId: number | null
) => Promise<void>;

export type HandleDeleteBookmark = (
  question: MockExamQuestion
) => Promise<void>;

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

  const saveBookmark: HandleSaveBookmark = async (question, folderId) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }

      if (question.myBookmark) {
        const res = await moveQuestionBookmarkMutationFn({
          bookmarkId: question.myBookmark.id,
          bookmarkFolderId: folderId,
        });
        if (res.data.moveQuestionBookmark) {
          const newQuestion = {
            ...question,
            myBookmark: {
              ...question.myBookmark,
              bookmarkFolder: {
                id: folderId,
              },
            },
          };
          dispatch(
            mockExamActions.setQuestion(
              newQuestion as unknown as MockExamQuestion
            )
          );
        }
      } else {
        const res = await createQuestionBookmarkMutationFn({
          questionId: question.id,
          questionBookmarkFolderId: folderId,
        });
        if (res.data.createQuestionBookmark) {
          const newQuestion = {
            ...question,
            myBookmark: res.data.createQuestionBookmark.myBookmark,
            isBookmarked: true,
          };
          dispatch(
            mockExamActions.setQuestion(
              newQuestion as unknown as MockExamQuestion
            )
          );
        }
      }
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('북마크 저장에 실패했습니다.');
    }
  };

  const deleteBookmark: HandleDeleteBookmark = async (
    question: MockExamQuestion
  ) => {
    try {
      if (!question.myBookmark) {
        message.error('북마크가 존재하지 않습니다.');
        return;
      }
      const newQuestion = {
        ...question,
        myBookmark: null,
        isBookmarked: false,
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      await deleteQuestionBookmarkMutationFn({
        questionBookmarkId: question.myBookmark.id,
      });
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('북마크 삭제에 실패했습니다.');
    }
  };

  const saveQuestionState = async (
    question: MockExamQuestion,
    state: QuestionState,
    updateCacheDelay?: number
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

      if (updateCacheDelay) {
        setTimeout(() => {
          dispatch(mockExamActions.setQuestion(newQuestion));
        }, updateCacheDelay);
      } else {
        dispatch(mockExamActions.setQuestion(newQuestion));
      }
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
    deleteBookmark,
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
