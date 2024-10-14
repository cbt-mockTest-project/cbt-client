import { FetchPolicy, WatchQueryFetchPolicy } from '@apollo/client';
import { loginModal } from '@lib/constants';
import { useLazyReadQuestionsByExamIds } from '@lib/graphql/hook/useExamQuestion';

import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { READ_BOOKMARKED_QUESTIONS } from '@lib/graphql/query/questionQuery';
import {
  ReadBookmarkedQuestionsQuery,
  ReadBookmarkedQuestionsQueryVariables,
} from '@lib/graphql/query/questionQuery.generated';
import {
  createQuestionBookmarkMutationFn,
  deleteQuestionBookmarkMutationFn,
  moveQuestionBookmarkMutationFn,
} from '@lib/mutation/questionBookmarkMutation';
import {
  deleteTextHighlightMutationFn,
  insertTextHighlightMutationFn,
} from '@lib/mutation/textHighlightMutation';
import { handleError } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';
import { coreActions } from '@modules/redux/slices/core';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import { App } from 'antd';
import { useDispatch } from 'react-redux';
import {
  DeleteTextHighlightInput,
  InsertTextHighlightInput,
  MockExamQuestion,
  QuestionState,
  ReadBookmarkedQuestionsInput,
  ReadQuestionsByExamIdsInput,
  TextHighlight,
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
  const [changeQuestionState] = useChangeQuestionState();

  const {
    handleAddFeedback,
    handleDeleteFeedback,
    handleEditFeedback,
    handleUpdateFeedbackRecommendation,
  } = useQuestionFeedback();

  const undoExcludeObjectiveQuestion = async (questionId: number) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      await changeQuestionState({
        variables: {
          input: {
            questionId,
            state: QuestionState.Core,
          },
        },
      });
      dispatch(mockExamActions.setUndoExcludeQuestion(questionId));
    } catch (e) {
      handleError(e);
    }
  };

  const excludeObjectiveQuestion = async (questionId: number) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      // 객관식에서는 middle을 제외 상태로 사용한다.
      await changeQuestionState({
        variables: {
          input: {
            questionId,
            state: QuestionState.Exclude,
          },
        },
      });
      dispatch(mockExamActions.setExcludeQuestion(questionId));
    } catch (e) {
      handleError(e);
    }
  };

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
          mockExamActions.setQuestions({
            questions: res.data.readQuestionsByExamIds
              .questions as MockExamQuestion[],
            order: questionsQueryInput.order,
          })
        );
        return res.data.readQuestionsByExamIds.questions as MockExamQuestion[];
      }
    } catch (e) {
      handleError(e);
    }
  };

  const fetchBookmarkedQuestions = async (
    input: ReadBookmarkedQuestionsInput,
    fetchPolicy: FetchPolicy = 'network-only'
  ) => {
    try {
      const res = await apolloClient.query<
        ReadBookmarkedQuestionsQuery,
        ReadBookmarkedQuestionsQueryVariables
      >({
        fetchPolicy,
        query: READ_BOOKMARKED_QUESTIONS,
        variables: {
          input,
        },
      });
      if (res.data?.readBookmarkedQuestions.questions) {
        dispatch(
          mockExamActions.setQuestions({
            questions: res.data.readBookmarkedQuestions
              .questions as MockExamQuestion[],
            order: input.order,
          })
        );
        return res.data.readBookmarkedQuestions.questions;
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
        if (res.data.moveQuestionBookmark.ok) {
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
          message.success('북마크 이동 완료');
          return;
        }
        message.error(res.data.moveQuestionBookmark.error);
        return;
      } else {
        const res = await createQuestionBookmarkMutationFn({
          questionId: question.id,
          questionBookmarkFolderId: folderId,
        });
        if (res.data.createQuestionBookmark.ok) {
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
          message.success('북마크 저장 완료');
          return;
        }
        message.error(res.data.createQuestionBookmark.error);
        return;
      }
    } catch {
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
      const res = await deleteQuestionBookmarkMutationFn({
        questionBookmarkId: question.myBookmark.id,
      });
      if (res.data.deleteQuestionBookmark.ok) {
        const newQuestion = {
          ...question,
          myBookmark: null,
          isBookmarked: false,
        };
        dispatch(mockExamActions.setQuestion(newQuestion));
        message.success('북마크 삭제 완료');
        return;
      }
      message.error(res.data.deleteQuestionBookmark.error);
      return;
    } catch {
      message.error('북마크 삭제에 실패했습니다.');
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

  const saveQuestionStateAndObjectiveAnswer = async (
    question: MockExamQuestion,
    selectedAnswer: number
  ) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      const currentMyObjectiveAnswer = question.myObjectiveAnswer;
      if (currentMyObjectiveAnswer === selectedAnswer) {
        return;
      }
      const currentQuestionAnswer = question.objectiveData.answer;
      const state =
        currentQuestionAnswer === selectedAnswer
          ? QuestionState.High
          : QuestionState.Row;
      const newQuestion: MockExamQuestion = {
        ...question,
        myQuestionState: state,
        myObjectiveAnswer: selectedAnswer,
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      await changeQuestionState({
        variables: {
          input: {
            questionId: question.id,
            answer: selectedAnswer,
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
    dispatch(mockExamActions.setQuestions({ questions: [] }));
  };

  const filterQuestions = (states: QuestionState[]) => {
    dispatch(mockExamActions.filterQuestions(states));
  };
  const setQuestions = (questions: MockExamQuestion[]) => {
    dispatch(mockExamActions.setQuestions({ questions }));
  };

  const setServerSideQuestions = (questions: MockExamQuestion[]) => {
    dispatch(mockExamActions.setServerSideQuestions(questions));
  };

  const insertTextHighlight = async (
    question: MockExamQuestion,
    input: InsertTextHighlightInput
  ) => {
    try {
      const res = await insertTextHighlightMutationFn(input);
      if (res.data.insertTextHighlight.ok) {
        const newTextHighlight = question.textHighlight.filter(
          (textHighlight) =>
            textHighlight.id !== res.data.insertTextHighlight.textHighlight.id
        );
        const newQuestion: MockExamQuestion = {
          ...question,
          textHighlight: [
            ...newTextHighlight,
            res.data.insertTextHighlight.textHighlight as TextHighlight,
          ],
        };
        dispatch(mockExamActions.setQuestion(newQuestion));
      }
    } catch (e) {
      handleError(e);
    }
  };

  const removeTextHighlight = async (
    question: MockExamQuestion,
    input: DeleteTextHighlightInput
  ) => {
    try {
      const res = await deleteTextHighlightMutationFn(input);
      if (res.data.deleteTextHighlight.ok) {
        const newQuestion = {
          ...question,
          textHighlight: question.textHighlight.filter(
            (textHighlight) => textHighlight.id !== input.textHighlightId
          ),
        };
        dispatch(mockExamActions.setQuestion(newQuestion));
      }
    } catch (e) {
      handleError(e);
    }
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
    fetchBookmarkedQuestions,
    insertTextHighlight,
    removeTextHighlight,
    saveQuestionStateAndObjectiveAnswer,
    excludeObjectiveQuestion,
    undoExcludeObjectiveQuestion,
  };
};

export default useQuestions;
