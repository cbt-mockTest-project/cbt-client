import {
  useDeleteQuestion,
  useReadQuestion,
} from '../graphql/hook/useExamQuestion';
import useApolloClient from './useApolloCient';
import { READ_QUESTION } from '../graphql/query/questionQuery';
import { ReadMockExamQuestionQuery } from '../graphql/query/questionQuery.generated';
import { App } from 'antd';
import { handleError } from '../utils/utils';
import {
  MockExamQuestion,
  QuestionState,
  ReadMockExamQuestionInput,
} from '../../types';
import { useEditQuestionBookmark } from '../graphql/hook/useQuestionBookmark';
import { useMeQuery } from '../graphql/hook/useUser';
import { useAppDispatch } from '../../_modules/redux/store/configureStore';
import { coreActions } from '../../_modules/redux/slices/core';
import { loginModal } from '../constants';
import useQuestionFeedback, {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from './useQuestionFeedback';
import { useChangeQuestionState } from '../graphql/hook/useQuestionState';

const useQuestion = (questionQueryInput: ReadMockExamQuestionInput) => {
  const { message } = App.useApp();
  const { updateCache } = useApolloClient();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const { data: questionQuery, refetch: refetchQuestion } =
    useReadQuestion(questionQueryInput);
  const [deleteQuestion] = useDeleteQuestion();
  const [changeQuestionState] = useChangeQuestionState();
  const [editBookmarkMutaion] = useEditQuestionBookmark();

  const {
    handleAddFeedback: addFeedback,
    handleDeleteFeedback: deleteFeedback,
    handleEditFeedback: editFeedback,
    handleUpdateFeedbackRecommendation: updateFeedbackRecommendation,
  } = useQuestionFeedback();

  const handleSaveBookmark = async (question: MockExamQuestion) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      const newQuestion = {
        ...question,
        isBookmarked: !question.isBookmarked,
      };
      updateQuestionCache(newQuestion);
      await editBookmarkMutaion({
        variables: {
          input: {
            questionId: question.id,
          },
        },
      });
    } catch {
      updateQuestionCache(question);
      message.error('북마크 저장에 실패했습니다.');
    }
  };

  const handleSaveQuestionState = async (
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
      updateQuestionCache(newQuestion);
      await changeQuestionState({
        variables: {
          input: {
            questionId: question.id,
            state,
          },
        },
      });
    } catch {
      updateQuestionCache(question);
      message.error('문제 상태 저장에 실패했습니다.');
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteQuestion({
          variables: {
            input: { id: questionId },
          },
        });
        if (res.data?.deleteMockExamQuestion.ok) {
          message.success('문제가 삭제되었습니다.');
          updateQuestionCache(null);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteFeedback = async ({
    question,
    feedback,
  }: Omit<DeleteFeedbackInput, 'setQuestion'>) => {
    deleteFeedback({
      question,
      feedback,
      setQuestion: updateQuestionCache,
    });
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
      setQuestion: updateQuestionCache,
    });
  };

  const handleAddFeedback = async (
    addFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => {
    addFeedback({
      ...addFeedbackInput,
      setQuestion: updateQuestionCache,
    });
  };

  const handleEditFeedback = async (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => {
    editFeedback({
      ...editFeedbackInput,
      setQuestion: updateQuestionCache,
    });
  };

  const updateQuestionCache = (newQuestion: MockExamQuestion) => {
    updateCache<ReadMockExamQuestionQuery>(
      {
        query: READ_QUESTION,
        variables: {
          input: questionQueryInput,
        },
      },
      (data) => {
        return {
          ...data,
          readMockExamQuestion: {
            ...data.readMockExamQuestion,
            mockExamQusetion: newQuestion,
          },
        };
      }
    );
  };

  return {
    refetchQuestion,
    handleDeleteQuestion,
    handleSaveBookmark,
    handleDeleteFeedback,
    handleUpdateFeedbackRecommendation,
    handleAddFeedback,
    handleSaveQuestionState,
    handleEditFeedback,
    questionQuery,
  };
};

export default useQuestion;
