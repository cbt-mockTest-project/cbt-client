import { loginModal } from '@lib/constants';
import { useLazyReadQuestionsByExamIds } from '@lib/graphql/user/hook/useExamQuestion';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { useEditQuestionBookmark } from '@lib/graphql/user/hook/useQuestionBookmark';
import {
  useDeleteQuestionFeedback,
  useEditQuestionFeedback,
  useUpdateQuestionFeedbackRecommendation,
} from '@lib/graphql/user/hook/useQuestionFeedback';
import { useChangeQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import {
  MockExamQuestion,
  MockExamQuestionFeedback,
  MyRecommedationStatus,
  QuestionFeedbackRecommendationType,
  QuestionFeedbackType,
  QuestionState,
  ReadQuestionsByExamIdsInput,
} from 'types';

export interface QuestionAndFeedback {
  question: MockExamQuestion;
  feedback: MockExamQuestionFeedback;
}

export interface AddFeedbackInput {
  question: MockExamQuestion;
  selectedType: QuestionFeedbackType;
  content: string;
}

export interface EditFeedbackInput extends AddFeedbackInput {
  feedbackId: number;
}

export interface UpdateFeedbackRecommendationInput extends QuestionAndFeedback {
  type: QuestionFeedbackRecommendationType;
  myRecommendationStatus: MyRecommedationStatus;
}

const useQuestions = () => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();
  const questions = useAppSelector((state) => state.mockExam.questions);
  const [readQuestionsQuery] = useLazyReadQuestionsByExamIds();
  const [editBookmarkMutaion] = useEditQuestionBookmark();
  const [deleteFeedbackMutaion] = useDeleteQuestionFeedback();
  const [editFeedbackMutaion, { loading: editFeedbackLoading }] =
    useEditQuestionFeedback();
  const [addQuestionFeedbackMutation, { loading: addFeedbackLoading }] =
    useCreateQuestionFeedBack();
  const [updateFeedbackRecommendationMutaion] =
    useUpdateQuestionFeedbackRecommendation();
  const [changeQuestionState] = useChangeQuestionState();

  const fetchQuestions = async (
    questionsQueryInput: ReadQuestionsByExamIdsInput
  ) => {
    try {
      const res = await readQuestionsQuery({
        variables: {
          input: questionsQueryInput,
        },
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
      if (!meQuery?.me.user) return dispatch(coreActions.openModal(loginModal));
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
      if (!meQuery?.me.user) return dispatch(coreActions.openModal(loginModal));
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

  const deleteFeedback = async ({
    question,
    feedback,
  }: QuestionAndFeedback) => {
    try {
      if (!meQuery?.me.user) return dispatch(coreActions.openModal(loginModal));
      const res = await deleteFeedbackMutaion({
        variables: {
          input: {
            id: feedback.id,
          },
        },
      });
      if (res.data?.deleteMockExamQuestionFeedback.ok) {
        const newQuestion: MockExamQuestion = {
          ...question,
          mockExamQuestionFeedback: question.mockExamQuestionFeedback.filter(
            (el) => el.id !== feedback.id
          ),
        };
        dispatch(mockExamActions.setQuestion(newQuestion));
        return message.success('삭제 완료');
      } else message.error(res.data?.deleteMockExamQuestionFeedback.error);
    } catch {
      message.error('삭제 실패');
    }
  };
  const updateFeedbackRecommendation = async ({
    type,
    myRecommendationStatus,
    question,
    feedback,
  }: UpdateFeedbackRecommendationInput) => {
    try {
      if (!meQuery?.me.user) return dispatch(coreActions.openModal(loginModal));
      const newQuestion = {
        ...question,
        mockExamQuestionFeedback: question.mockExamQuestionFeedback.map(
          (feedback) => {
            if (feedback.id === feedback.id) {
              let newReccomendationCount = cloneDeep(
                feedback.recommendationCount
              );
              let newMyRecommedationStatus = cloneDeep(
                feedback.myRecommedationStatus
              );
              if (myRecommendationStatus.isGood) {
                if (type === QuestionFeedbackRecommendationType.Good) {
                  newReccomendationCount.good -= 1;
                  newMyRecommedationStatus.isGood = false;
                }
                if (type === QuestionFeedbackRecommendationType.Bad) {
                  newReccomendationCount.good -= 1;
                  newReccomendationCount.bad += 1;
                  newMyRecommedationStatus.isGood = false;
                  newMyRecommedationStatus.isBad = true;
                }
              }
              if (myRecommendationStatus.isBad) {
                if (type === QuestionFeedbackRecommendationType.Good) {
                  newReccomendationCount.good += 1;
                  newReccomendationCount.bad -= 1;
                  newMyRecommedationStatus.isGood = true;
                  newMyRecommedationStatus.isBad = false;
                }
                if (type === QuestionFeedbackRecommendationType.Bad) {
                  newReccomendationCount.bad -= 1;
                  newMyRecommedationStatus.isBad = false;
                }
              }
              if (
                !myRecommendationStatus.isGood &&
                !myRecommendationStatus.isBad
              ) {
                if (type === QuestionFeedbackRecommendationType.Good) {
                  newReccomendationCount.good += 1;
                  newMyRecommedationStatus.isGood = true;
                }
                if (type === QuestionFeedbackRecommendationType.Bad) {
                  newReccomendationCount.bad += 1;
                  newMyRecommedationStatus.isBad = true;
                }
              }
              return {
                ...feedback,
                myRecommedationStatus: newMyRecommedationStatus,
                recommendationCount: newReccomendationCount,
              };
            }
            return feedback;
          }
        ),
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      updateFeedbackRecommendationMutaion({
        variables: {
          input: {
            feedbackId: feedback.id,
            type,
          },
        },
      });
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const addFeedback = async (addFeedbackInput: AddFeedbackInput) => {
    const { question, selectedType, content } = addFeedbackInput;
    try {
      const res = await addQuestionFeedbackMutation({
        variables: {
          input: {
            questionId: question.id,
            type: selectedType,
            content,
          },
        },
      });
      if (!res.data?.createMockExamQuestionFeedback.ok) {
        message.error('피드백 등록에 실패했습니다.');
        return;
      }
      if (res.data?.createMockExamQuestionFeedback.feedback) {
        const newFeedback = res.data?.createMockExamQuestionFeedback
          .feedback as MockExamQuestionFeedback;
        const mockExamQuestionFeedback = [...question.mockExamQuestionFeedback];
        if (newFeedback.type === QuestionFeedbackType.Private) {
          mockExamQuestionFeedback.unshift(newFeedback);
        } else {
          mockExamQuestionFeedback.push(newFeedback);
        }
        const newQuestion = {
          ...question,
          mockExamQuestionFeedback,
        };
        dispatch(mockExamActions.setQuestion(newQuestion as MockExamQuestion));
        message.success('피드백이 등록되었습니다.');
      }
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('피드백 등록에 실패했습니다.');
    }
  };
  const editFeedback = async (editFeedbackInput: EditFeedbackInput) => {
    const { question, selectedType, content, feedbackId } = editFeedbackInput;
    try {
      const res = await editFeedbackMutaion({
        variables: {
          input: {
            id: feedbackId,
            content,
            type: selectedType,
          },
        },
      });
      if (!res.data?.editMockExamQuestionFeedback.ok) {
        message.error('피드백 수정에 실패했습니다.');
        return;
      }
      const newQuestion: MockExamQuestion = {
        ...question,
        mockExamQuestionFeedback: question.mockExamQuestionFeedback.map(
          (el) => {
            if (el.id === feedbackId) {
              return {
                ...el,
                content,
                type: selectedType,
              };
            }
            return el;
          }
        ),
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      message.success('피드백이 수정되었습니다.');
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('피드백 수정에 실패했습니다.');
    }
  };

  return {
    questions,
    saveBookmark,
    fetchQuestions,
    saveQuestionState,
    deleteFeedback,
    addFeedback,
    addFeedbackLoading,
    editFeedback,
    editFeedbackLoading,
    updateFeedbackRecommendation,
  };
};

export default useQuestions;
