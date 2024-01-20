import { useEditQuestionBookmark } from '@lib/graphql/hook/useQuestionBookmark';
import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { useState } from 'react';
import {
  MockExamQuestion,
  MockExamQuestionFeedback,
  QuestionFeedbackRecommendationType,
  QuestionFeedbackType,
  QuestionState,
} from 'types';
import useAuth from './useAuth';
import { useCreateQuestionFeedBack } from '@lib/graphql/hook/useFeedBack';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from './useQuestionFeedback';
import { message } from 'antd';
import {
  useDeleteQuestionFeedback,
  useEditQuestionFeedback,
  useUpdateQuestionFeedbackRecommendation,
} from '@lib/graphql/hook/useQuestionFeedback';
import { cloneDeep } from 'lodash';

interface UseHandleQuestionProps {
  defaultQuestion: MockExamQuestion;
}

const useHandleQuestion = ({ defaultQuestion }: UseHandleQuestionProps) => {
  const [changeQuestionState] = useChangeQuestionState();
  const [addQuestionFeedbackMutation] = useCreateQuestionFeedBack();
  const [deleteFeedbackMutaion] = useDeleteQuestionFeedback();
  const [editFeedbackMutaion] = useEditQuestionFeedback();
  const [updateFeedbackRecommendationMutaion] =
    useUpdateQuestionFeedbackRecommendation();
  const { user, handleCheckLogin } = useAuth();
  const [editBookmarkMutaion] = useEditQuestionBookmark();
  const [question, setQuestion] = useState(defaultQuestion);
  const handleSaveQuestionState = async (
    question: MockExamQuestion,
    state: QuestionState
  ) => {
    try {
      if (!handleCheckLogin()) return;
      setQuestion(() => ({
        ...question,
        myQuestionState: state,
      }));
      await changeQuestionState({
        variables: {
          input: {
            questionId: question.id,
            state,
          },
        },
      });
    } catch (e) {
      setQuestion(() => question);
      console.log(e);
    }
  };
  const handleSaveBookmark = async (question: MockExamQuestion) => {
    try {
      if (!handleCheckLogin()) return;
      setQuestion(() => ({
        ...question,
        isBookmarked: !question.isBookmarked,
      }));
      await editBookmarkMutaion({
        variables: {
          input: {
            questionId: question.id,
          },
        },
      });
    } catch (e) {
      setQuestion(() => question);
      console.log(e);
    }
  };
  const handleAddFeedback = async (
    addFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => {
    const { question, selectedType, content } = addFeedbackInput;
    try {
      if (!handleCheckLogin()) return;
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
        setQuestion(newQuestion);
        message.success('피드백이 등록되었습니다.');
      }
    } catch {
      setQuestion(question);
      message.error('피드백 등록에 실패했습니다.');
    }
  };
  const handleEditFeedback = async (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => {
    const { question, selectedType, content, feedbackId } = editFeedbackInput;
    try {
      if (!handleCheckLogin()) return;
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
      setQuestion(newQuestion);
      message.success('피드백이 수정되었습니다.');
    } catch {
      setQuestion(question);
      message.error('피드백 수정에 실패했습니다.');
    }
  };
  const handleDeleteFeedback = async ({
    question,
    feedback,
  }: Omit<DeleteFeedbackInput, 'setQuestion'>) => {
    try {
      if (!handleCheckLogin()) return;
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
        setQuestion(newQuestion);
        message.success('삭제 완료');
      } else message.error(res.data?.deleteMockExamQuestionFeedback.error);
    } catch {
      setQuestion(question);
      message.error('삭제 실패');
    }
  };

  const handleUpdateFeedbackRecommendation = async ({
    type,
    myRecommendationStatus,
    question,
    feedback,
  }: Omit<UpdateFeedbackRecommendationInput, 'setQuestion'>) => {
    try {
      if (!handleCheckLogin()) return;
      const newQuestion = {
        ...question,
        mockExamQuestionFeedback: question.mockExamQuestionFeedback.map(
          (item) => {
            if (item.id === feedback.id) {
              let newReccomendationCount = cloneDeep(item.recommendationCount);
              let newMyRecommedationStatus = cloneDeep(
                item.myRecommedationStatus
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
                ...item,
                myRecommedationStatus: newMyRecommedationStatus,
                recommendationCount: newReccomendationCount,
              };
            }
            return item;
          }
        ),
      };
      setQuestion(newQuestion);
      updateFeedbackRecommendationMutaion({
        variables: {
          input: {
            feedbackId: feedback.id,
            type,
          },
        },
      });
    } catch {
      setQuestion(question);
      message.error('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    question,
    handleSaveQuestionState,
    handleSaveBookmark,
    handleAddFeedback,
    handleEditFeedback,
    handleDeleteFeedback,
    handleUpdateFeedbackRecommendation,
  };
};

export default useHandleQuestion;
