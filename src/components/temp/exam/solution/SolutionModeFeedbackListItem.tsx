import { FeedbackTypeMap } from '@lib/constants/feedback';
import { convertToKST } from '@lib/utils/utils';
import palette from '@styles/palette';
import parse from 'html-react-parser';
import { Divider, Dropdown, MenuProps, Modal, Tag, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MockExamQuestion,
  MockExamQuestionFeedback,
  QuestionFeedbackRecommendationType,
  QuestionFeedbackType,
  UserRole,
} from 'types';
import {
  EllipsisOutlined,
  FrownOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import {
  useDeleteQuestionFeedback,
  useEditQuestionFeedback,
  useUpdateQuestionFeedbackRecommendation,
} from '@lib/graphql/user/hook/useQuestionFeedback';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import QuestionFeedbackModal from '../QuestionFeedbackModal';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
const SolutionModeFeedbackListItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .feedback-header-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
  }
  .feedback-type-label.error {
    color: red;
    border-color: red;
  }

  .feedback-user-name {
    color: ${palette.gray_700};
    font-size: 14px;
    max-width: 200px;
    width: fit-content;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .feedback-content {
    white-space: pre-wrap;
  }
  .feedback-date {
    color: ${palette.gray_500};
    font-size: 12px;
  }
  .feedback-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .feedback-button-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    svg {
      font-size: 22px;
    }
  }
  .feedback-recommendation-icon-and-value {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${palette.gray_700};
    cursor: pointer;
    transition: 0.2s all ease-in;
  }
  .feedback-recommendation-icon-and-value.good {
    &:hover {
      color: ${palette.antd_blue_02};
    }
  }
  .feedback-recommendation-icon-and-value.bad {
    &:hover {
      color: red;
    }
  }
  .feedback-recommendation-icon-and-value.good.active {
    color: ${palette.antd_blue_02};
  }
  .feedback-recommendation-icon-and-value.bad.active {
    color: red;
  }
  .feedback-control-button-wrapper {
    color: ${palette.gray_900};
    border: 2px solid ${palette.gray_700};
    width: 22px;
    height: 22px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    padding: 2px;
    border-radius: 50%;
    transition: 0.2s all ease-in;
    &:hover {
      border-color: ${palette.antd_blue_02};
      color: ${palette.antd_blue_02};
    }
    svg {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

interface SolutionModeFeedbackListItemProps {
  feedback: MockExamQuestionFeedback;
  question: MockExamQuestion;
}

const SolutionModeFeedbackListItem: React.FC<
  SolutionModeFeedbackListItemProps
> = ({ feedback, question }) => {
  const { data: meQuery } = useMeQuery();
  const [isQuestionFeedbackModalOpen, setIsQuestionFeedbackModalOpen] =
    useState(false);
  const [deleteFeedback] = useDeleteQuestionFeedback();
  const [updateFeedbackRecommendation] =
    useUpdateQuestionFeedbackRecommendation();
  const dispatch = useAppDispatch();
  const handleDeleteFeedback = async () => {
    try {
      const res = await deleteFeedback({
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
  const handleUpdateFeedbackRecommendation = async (
    type: QuestionFeedbackRecommendationType
  ) => {
    try {
      const newQuestion = {
        ...question,
        mockExamQuestionFeedback: question.mockExamQuestionFeedback.map(
          (el) => {
            if (el.id === feedback.id) {
              return {
                ...el,
                myRecommedationStatus: {
                  isGood: type === QuestionFeedbackRecommendationType.Good,
                  isBad: type === QuestionFeedbackRecommendationType.Bad,
                },
                recommendationCount: {
                  good:
                    type === QuestionFeedbackRecommendationType.Good
                      ? el.recommendationCount.good + 1
                      : el.recommendationCount.good,
                  bad:
                    type === QuestionFeedbackRecommendationType.Bad
                      ? el.recommendationCount.bad + 1
                      : el.recommendationCount.bad,
                },
              };
            }
            return el;
          }
        ),
      };

      updateFeedbackRecommendation({
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
  const controlDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <button
          onClick={() => {
            Modal.confirm({
              title: '정말로 삭제하시겠습니까?',
              onOk: handleDeleteFeedback,
            });
          }}
        >
          삭제하기
        </button>
      ),
    },
    {
      key: 2,
      label: (
        <button
          onClick={() => {
            setIsQuestionFeedbackModalOpen(true);
          }}
        >
          수정하기
        </button>
      ),
    },
  ];
  return (
    <SolutionModeFeedbackListItemBlock>
      <div className="feedback-header-wrapper">
        <div className="feedback-user-name">
          <span>{feedback.user.nickname}</span>
        </div>
        <Tag
          className={`feedback-type-label ${
            feedback.type === QuestionFeedbackType.Report ? 'error' : ''
          }`}
        >
          {FeedbackTypeMap[feedback.type]}
        </Tag>
      </div>
      <div className="feedback-content">{parse(feedback.content)}</div>
      <div className="feedback-footer">
        <div className="feedback-button-wrapper">
          <div
            className={`feedback-recommendation-icon-and-value good ${
              feedback.myRecommedationStatus.isGood ? 'active' : ''
            }`}
          >
            <SmileOutlined />
            <span>{feedback.recommendationCount.good}</span>
          </div>
          <div
            className={`feedback-recommendation-icon-and-value bad ${
              feedback.myRecommedationStatus.isBad ? 'active' : ''
            }`}
          >
            <FrownOutlined />
            <span>{feedback.recommendationCount.bad}</span>
          </div>
          {(meQuery?.me.user?.id === feedback.user.id ||
            meQuery?.me.user?.role === UserRole.Admin) && (
            <Dropdown
              menu={{ items: controlDropdownItems }}
              placement="topCenter"
            >
              <div className="feedback-control-button-wrapper">
                <EllipsisOutlined />
              </div>
            </Dropdown>
          )}
        </div>
        <div className="feedback-date">
          {convertToKST(feedback.created_at, 'yy.MM.dd HH:mm')}
        </div>
      </div>
      {isQuestionFeedbackModalOpen && (
        <QuestionFeedbackModal
          question={question}
          feedbackId={feedback.id}
          open={isQuestionFeedbackModalOpen}
          onCancel={() => setIsQuestionFeedbackModalOpen(false)}
          onClose={() => setIsQuestionFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
        />
      )}
    </SolutionModeFeedbackListItemBlock>
  );
};

export default SolutionModeFeedbackListItem;
