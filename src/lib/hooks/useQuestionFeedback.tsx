import { loginModal } from '@lib/constants';
import { useCreateQuestionFeedBack } from '@lib/graphql/hook/useFeedBack';
import {
  useDeleteQuestionFeedback,
  useEditQuestionFeedback,
  useUpdateQuestionFeedbackRecommendation,
} from '@lib/graphql/hook/useQuestionFeedback';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import { message } from 'antd';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import {
  MockExamQuestion,
  MockExamQuestionFeedback,
  MyRecommedationStatus,
  QuestionFeedbackRecommendationType,
  QuestionFeedbackType,
} from 'types';

export interface QuestionAndFeedback {
  question: MockExamQuestion;
  feedback: MockExamQuestionFeedback;
}

export interface DeleteFeedbackInput extends QuestionAndFeedback {
  setQuestion: (question: MockExamQuestion) => void;
}

export interface AddFeedbackInput {
  question: MockExamQuestion;
  selectedType: QuestionFeedbackType;
  content: string;
  setQuestion: (question: MockExamQuestion) => void;
}

export interface EditFeedbackInput extends AddFeedbackInput {
  feedbackId: number;
}

export interface UpdateFeedbackRecommendationInput extends QuestionAndFeedback {
  type: QuestionFeedbackRecommendationType;
  myRecommendationStatus: MyRecommedationStatus;
  setQuestion: (question: MockExamQuestion) => void;
}

const useQuestionFeedback = () => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();
  const [deleteFeedbackMutaion] = useDeleteQuestionFeedback();
  const [editFeedbackMutaion] = useEditQuestionFeedback();
  const [addQuestionFeedbackMutation] = useCreateQuestionFeedBack();
  const [updateFeedbackRecommendationMutaion] =
    useUpdateQuestionFeedbackRecommendation();

  const handleDeleteFeedback = async ({
    question,
    feedback,
    setQuestion,
  }: DeleteFeedbackInput) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
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
      message.error('삭제 실패');
    }
  };
  const handleUpdateFeedbackRecommendation = async ({
    type,
    myRecommendationStatus,
    question,
    feedback,
    setQuestion,
  }: UpdateFeedbackRecommendationInput) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
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

  const handleAddFeedback = async (addFeedbackInput: AddFeedbackInput) => {
    const { question, selectedType, content, setQuestion } = addFeedbackInput;
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
        setQuestion(newQuestion);
        message.success('피드백이 등록되었습니다.');
      }
    } catch {
      setQuestion(question);
      message.error('피드백 등록에 실패했습니다.');
    }
  };

  const handleEditFeedback = async (editFeedbackInput: EditFeedbackInput) => {
    const { question, selectedType, content, feedbackId, setQuestion } =
      editFeedbackInput;
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
      setQuestion(newQuestion);
      message.success('피드백이 수정되었습니다.');
    } catch {
      setQuestion(question);
      message.error('피드백 수정에 실패했습니다.');
    }
  };

  return {
    handleDeleteFeedback,
    handleUpdateFeedbackRecommendation,
    handleAddFeedback,
    handleEditFeedback,
  };
};

export default useQuestionFeedback;
