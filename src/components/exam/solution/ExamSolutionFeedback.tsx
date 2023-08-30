import Badge from '@components/common/badge/Badge';
import { loginModal } from '@lib/constants';
import {
  useDeleteQuestionFeedback,
  useUpdateQuestionFeedbackRecommendation,
} from '@lib/graphql/user/hook/useQuestionFeedback';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import palette from '@styles/palette';
import { message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import {
  MyRecommedationStatus,
  QuestionFeedbackRecommendationType,
  QuestionFeedbackType,
  UserRole,
} from 'types';
import { ExamQuestionType } from './ExamSolutionList';
import { QuestionListType, examActions } from '@modules/redux/slices/exam';
import { cloneDeep } from 'lodash';

interface ExamSolutionFeedbackProps {
  question: ExamQuestionType;
  setQuestion?: React.Dispatch<React.SetStateAction<ExamQuestionType>>;
  type?: 'me' | 'others';
}

const ExamSolutionFeedback: React.FC<ExamSolutionFeedbackProps> = ({
  question,
  setQuestion,
  type = 'others',
}) => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const [deleteQuestionFeedback] = useDeleteQuestionFeedback();
  const [updateFeedbackRecommendation] =
    useUpdateQuestionFeedbackRecommendation();
  const requestFeedBackDelete = async (feedbackId: number) => {
    try {
      const confirmed = confirm('삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteQuestionFeedback({
          variables: { input: { id: feedbackId } },
        });
        if (res.data?.deleteMockExamQuestionFeedback.ok) {
          const newFeedback = question.mockExamQuestionFeedback.filter(
            (feedback) => feedback.id !== feedbackId
          );
          const newQuestion: ExamQuestionType = {
            ...question,
            mockExamQuestionFeedback: newFeedback,
          };
          if (setQuestion) {
            setQuestion(newQuestion);
          } else {
            dispatch(
              examActions.setCurrentQuestion({
                question: newQuestion as QuestionListType[number],
                updateList: true,
              })
            );
          }

          return message.success('삭제되었습니다.');
        }
        return message.error(res.data?.deleteMockExamQuestionFeedback.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  const isAllPrivate = question.mockExamQuestionFeedback.every(
    (feedback) => feedback.type === QuestionFeedbackType.Private
  );
  const isNotAllPrivate = question.mockExamQuestionFeedback.every(
    (feedback) =>
      feedback.type === QuestionFeedbackType.Public ||
      feedback.type === QuestionFeedbackType.Report
  );

  if (question.mockExamQuestionFeedback.length === 0) {
    return null;
  }
  if (type === 'others' && isAllPrivate) return null;
  if (type === 'me' && isNotAllPrivate) return null;

  const onUpdateFeedbackRecommendation = async (
    type: QuestionFeedbackRecommendationType,
    feedbackId: number,
    myRecommendationStatus: MyRecommedationStatus
  ) => {
    try {
      if (!meQuery?.me.user) {
        return openLoginModal();
      }
      const res = await updateFeedbackRecommendation({
        variables: {
          input: {
            feedbackId,
            type,
          },
        },
      });
      if (res.data?.updateMockExamQuestionFeedbackRecommendation.ok) {
        const feedbackResponse =
          res.data.updateMockExamQuestionFeedbackRecommendation;
        const newQuestion: ExamQuestionType = {
          ...question,
          mockExamQuestionFeedback: question.mockExamQuestionFeedback.map(
            (feedback) => {
              if (feedback.id === feedbackId) {
                let newReccomendationCount = cloneDeep(
                  feedback.recommendationCount
                );
                if (
                  myRecommendationStatus.isGood &&
                  type === QuestionFeedbackRecommendationType.Good
                ) {
                  newReccomendationCount.good -= 1;
                } else if (
                  myRecommendationStatus.isBad &&
                  type === QuestionFeedbackRecommendationType.Bad
                ) {
                  newReccomendationCount.bad -= 1;
                } else if (
                  myRecommendationStatus.isGood &&
                  type === QuestionFeedbackRecommendationType.Bad
                ) {
                  newReccomendationCount.good -= 1;
                  newReccomendationCount.bad += 1;
                } else if (
                  myRecommendationStatus.isBad &&
                  type === QuestionFeedbackRecommendationType.Good
                ) {
                  newReccomendationCount.good += 1;
                  newReccomendationCount.bad -= 1;
                } else if (
                  !myRecommendationStatus.isGood &&
                  type === QuestionFeedbackRecommendationType.Good
                ) {
                  newReccomendationCount.good += 1;
                } else if (
                  !myRecommendationStatus.isBad &&
                  type === QuestionFeedbackRecommendationType.Bad
                ) {
                  newReccomendationCount.bad += 1;
                }
                return {
                  ...feedback,
                  myRecommedationStatus: {
                    isGood:
                      feedbackResponse.recommendation?.type ===
                      QuestionFeedbackRecommendationType.Good,
                    isBad:
                      feedbackResponse.recommendation?.type ===
                      QuestionFeedbackRecommendationType.Bad,
                  },
                  recommendationCount: newReccomendationCount,
                };
              }
              return feedback;
            }
          ),
        };

        if (setQuestion) {
          setQuestion(newQuestion);
        } else {
          dispatch(
            examActions.setCurrentQuestion({
              question: newQuestion as QuestionListType[number],
              updateList: true,
            })
          );
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <ExamSolutionFeedbackContainer type={type}>
      {type === 'others' && (
        <div className="exam-solution-feedback-separation" />
      )}
      {question.mockExamQuestionFeedback.map(
        (feedback) =>
          ((type === 'others' &&
            feedback.type !== QuestionFeedbackType.Private) ||
            (type === 'me' &&
              feedback.type === QuestionFeedbackType.Private)) && (
            <li className="exam-solution-feedback-item" key={feedback.id}>
              <div className="exam-solution-feedback-user-tab">
                <p className="exam-solution-feedback-user-name">{`작성자: ${feedback.user.nickname}`}</p>
                {feedback.type === QuestionFeedbackType.Public && (
                  <Badge color="blue" label="추가답안" />
                )}
                {feedback.type === QuestionFeedbackType.Report && (
                  <Badge color="red" label="오류신고" />
                )}
                {feedback.type === QuestionFeedbackType.Private && (
                  <Badge color="blue" label="내답안" />
                )}
                {(meQuery?.me.user?.id === feedback.user.id ||
                  meQuery?.me.user?.role === UserRole.Admin) && (
                  <button
                    className="exam-solution-feedback-delete-button"
                    onClick={() => requestFeedBackDelete(feedback.id)}
                  >
                    삭제하기
                  </button>
                )}
              </div>
              <p className="exam-solution-feedback-content">
                {feedback.content}
              </p>
              {type === 'others' && (
                <div className="exam-solution-like-button-wrapper">
                  <button
                    onClick={() =>
                      onUpdateFeedbackRecommendation(
                        QuestionFeedbackRecommendationType.Good,
                        feedback.id,
                        feedback.myRecommedationStatus
                      )
                    }
                    className={`exam-solution-feedback-upvote-button ${
                      feedback.myRecommedationStatus.isGood ? 'active' : ''
                    }`}
                  >
                    <ThumbUpAltIcon />
                  </button>
                  <span>{feedback.recommendationCount.good}</span>
                  <button
                    onClick={() =>
                      onUpdateFeedbackRecommendation(
                        QuestionFeedbackRecommendationType.Bad,
                        feedback.id,
                        feedback.myRecommedationStatus
                      )
                    }
                    className={`exam-solution-feedback-downpvote-button ${
                      feedback.myRecommedationStatus.isBad ? 'active' : ''
                    }`}
                  >
                    <ThumbDownAltIcon />
                  </button>
                  <span>{feedback.recommendationCount.bad}</span>
                </div>
              )}
            </li>
          )
      )}
      {type === 'me' && <div className="exam-solution-feedback-separation" />}
    </ExamSolutionFeedbackContainer>
  );
};

export default ExamSolutionFeedback;

interface ExamSolutionFeedbackContainerProps
  extends Pick<ExamSolutionFeedbackProps, 'type'> {}

const ExamSolutionFeedbackContainer = styled.ul<ExamSolutionFeedbackContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${(props) =>
    props.type === 'others'
      ? css`
          margin-top: 10px;
        `
      : css`
          margin-bottom: 10px;
        `}
  .exam-solution-feedback-separation {
    width: 100%;
    border: 1px solid ${palette.gray_200};
  }
  .exam-solution-feedback-item {
  }
  .exam-solution-feedback-info {
    color: red;
    font-size: 0.8rem;
  }
  .exam-solution-feedback-content {
    white-space: pre-wrap;
  }
  .exam-solution-feedback-user-tab {
    display: flex;
    gap: 10px;
  }
  .exam-solution-feedback-user-name {
    font-size: 0.8rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .exam-solution-feedback-delete-button {
    font-size: 0.8rem;
    color: ${palette.gray_500};
    transition: color 0.3s;
    white-space: nowrap;
    width: max-content;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
  .exam-solution-like-button-wrapper {
    margin-top: 10px;
    display: flex;
    gap: 5px;
  }
  .exam-solution-feedback-upvote-button.active {
    color: ${palette.antd_blue_01};
  }
  .exam-solution-feedback-downpvote-button.active {
    color: ${palette.red_500};
  }

  .exam-solution-feedback-upvote-button,
  .exam-solution-feedback-downpvote-button {
  }
`;
