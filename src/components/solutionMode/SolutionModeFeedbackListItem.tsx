import { FeedbackTypeMap } from '@lib/constants/feedback';
import { convertServerTimeToKST } from '@lib/utils/utils';
import palette from '@styles/palette';
import parse from 'html-react-parser';
import { App, Dropdown, MenuProps, Tag } from 'antd';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
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

import QuestionFeedbackModal from './QuestionFeedbackModal';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';
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
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    font-size: 14px;
    max-width: 200px;
    width: fit-content;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .feedback-content {
    word-break: break-all;
    white-space: pre-wrap;
  }
  .feedback-date {
    color: ${({ theme }) => theme.color('colorTextTertiary')};
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

  .feedback-control-button-wrapper {
    svg {
      color: ${({ theme }) => theme.color('colorText')};
    }

    &:hover {
      svg {
        color: ${({ theme }) => theme.color('colorPrimary')};
      }
    }
  }
  .feedback-recommendation-icon-and-value {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    cursor: pointer;
    transition: 0.2s all ease-in;
  }
  .feedback-recommendation-icon-and-value.good {
    &:hover {
      color: ${({ theme }) => theme.color('colorPrimary')};
    }
  }
  .feedback-recommendation-icon-and-value.bad {
    &:hover {
      color: red;
    }
  }
  .feedback-recommendation-icon-and-value.good.active {
    color: ${({ theme }) => theme.color('colorPrimary')};
  }
  .feedback-recommendation-icon-and-value.bad.active {
    color: red;
  }
  .feedback-control-button-wrapper {
    color: ${palette.gray_900};
    border: 2px solid ${({ theme }) => theme.color('colorTextTertiary')};
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
      border-color: ${({ theme }) => theme.color('colorPrimary')};
      color: ${({ theme }) => theme.color('colorPrimary')};
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
  editFeedback: (editFeedbackInput: EditFeedbackInput) => Promise<void>;
  addFeedback: (addFeedbackInput: AddFeedbackInput) => Promise<void>;
  deleteFeedback: (
    deleteFeedbackInput: Omit<DeleteFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
  updateFeedbackRecommendation: (
    updateFeedbackRecommendationInput: Omit<
      UpdateFeedbackRecommendationInput,
      'setQuestion'
    >
  ) => Promise<void>;
}

const SolutionModeFeedbackListItem: React.FC<
  SolutionModeFeedbackListItemProps
> = ({
  feedback,
  question,
  editFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedbackRecommendation,
}) => {
  const { modal } = App.useApp();
  const theme = useTheme();
  const [currentFeedback, setCurrentFeedback] = useState('');
  const { data: meQuery } = useMeQuery();
  const [isQuestionFeedbackModalOpen, setIsQuestionFeedbackModalOpen] =
    useState(false);

  const controlDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <button
          style={{ color: theme.color('colorText') }}
          onClick={(e) => {
            e.stopPropagation();
            modal.confirm({
              title: '정말로 삭제하시겠습니까?',
              onOk: () => deleteFeedback({ question, feedback }),
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
          style={{ color: theme.color('colorText') }}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentFeedback(feedback.content);
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
            role="button"
            className={`feedback-recommendation-icon-and-value good ${
              feedback.myRecommedationStatus.isGood ? 'active' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              updateFeedbackRecommendation({
                type: QuestionFeedbackRecommendationType.Good,
                myRecommendationStatus: feedback.myRecommedationStatus,
                question,
                feedback,
              });
            }}
          >
            <SmileOutlined />
            <span>{feedback.recommendationCount.good}</span>
          </div>
          <div
            role="button"
            className={`feedback-recommendation-icon-and-value bad ${
              feedback.myRecommedationStatus.isBad ? 'active' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              updateFeedbackRecommendation({
                type: QuestionFeedbackRecommendationType.Bad,
                myRecommendationStatus: feedback.myRecommedationStatus,
                question,
                feedback,
              });
            }}
          >
            <FrownOutlined />
            <span>{feedback.recommendationCount.bad}</span>
          </div>
          {(meQuery?.me.user?.id === feedback.user.id ||
            meQuery?.me.user?.role === UserRole.Admin ||
            meQuery?.me.user?.id === question.user.id) && (
            <Dropdown
              menu={{ items: controlDropdownItems }}
              placement="topCenter"
            >
              <div
                className="feedback-control-button-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <EllipsisOutlined />
              </div>
            </Dropdown>
          )}
        </div>
        <div className="feedback-date">
          {convertServerTimeToKST(feedback.created_at, 'yy.MM.dd HH:mm')}
        </div>
      </div>
      {isQuestionFeedbackModalOpen && (
        <QuestionFeedbackModal
          question={question}
          feedbackId={feedback.id}
          defaultFeedback={currentFeedback}
          defaultType={feedback.type}
          open={isQuestionFeedbackModalOpen}
          onCancel={() => setIsQuestionFeedbackModalOpen(false)}
          onClose={() => setIsQuestionFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
          addFeedback={addFeedback}
          editFeedback={editFeedback}
        />
      )}
    </SolutionModeFeedbackListItemBlock>
  );
};

export default SolutionModeFeedbackListItem;
