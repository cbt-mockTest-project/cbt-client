import Bookmark from '@components/common/bookmark/Bookmark';
import parse from 'html-react-parser';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Image } from 'antd';
import { MockExamQuestion } from 'types';
import useAuth from '@lib/hooks/useAuth';
import { LinkOutlined } from '@ant-design/icons';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import useQuestions from '@lib/hooks/useQuestions';
import StudyBookmarkInfoModal from './StudyBookmarkInfoModal';
import EditorStyle from '@styles/editorStyle';
import Link from 'next/link';
import { responsive } from '@lib/utils/responsive';

const StudyQuestionBoxBlock = styled.div`
  .study-question-box-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .study-question-box-number-and-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .study-question-box-header-rignt-button-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      .study-question-box-header-rignt-button-edit {
        cursor: pointer;
        svg {
          font-size: 20px;
          &:hover {
            color: ${({ theme }) => theme.color('colorPrimary')};
          }
        }
      }
    }
  }
  .study-question-box-bookmark {
    height: 30px;
    svg {
      font-size: 30px;
    }
  }
  .study-question-box-number {
    font-size: 14px !important;
    font-weight: bold;
    width: fit-content;
    flex-shrink: 0;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .study-question-box-question {
    word-break: break-all;
    white-space: pre-wrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 16px;
    ${EditorStyle}
  }
  .study-question-box-image {
    max-width: 730px !important;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    @media (max-width: ${responsive.medium}) {
      max-width: 100% !important;
    }
  }
  .study-question-exam-title {
    font-size: 12px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  .study-question-edit-button {
    margin-left: auto;
  }
  .study-question-box-answer-percentage {
    position: relative;
    bottom: 5px;
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
`;

interface StudyQuestionBoxProps {
  saveBookmark: (question: MockExamQuestion) => void;
  questionNumber?: number;
  question: MockExamQuestion;
  className?: string;
  title?: string;
  hasExamTitle?: boolean;
  hasQuestionLink?: boolean;
  onChangeIsFeedbackModalOpen?: (value: boolean) => void;
  isVisibleImage?: boolean;
}

const StudyQuestionBox: React.FC<StudyQuestionBoxProps> = ({
  saveBookmark,
  question,
  questionNumber,
  className = '',
  title,
  hasExamTitle = true,
  hasQuestionLink = true,
  onChangeIsFeedbackModalOpen,
  isVisibleImage = true,
}) => {
  const [isBookmarkInfoModalOpen, setIsBookmarkInfoModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { addFeedback, editFeedback } = useQuestions();
  const { user, handleUpdateUserCache } = useAuth();
  const isMyQuestion = useMemo(() => {
    if (!user) return false;
    return user.id === question?.user.id;
  }, [user, question]);

  const onClickBookmark = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    saveBookmark(question);
    if (!user?.hasBookmarkedBefore) {
      setIsBookmarkInfoModalOpen(true);
      handleUpdateUserCache({ hasBookmarkedBefore: true });
    }
  };

  useEffect(() => {
    if (onChangeIsFeedbackModalOpen) {
      onChangeIsFeedbackModalOpen(isFeedbackModalOpen);
    }
  }, [onChangeIsFeedbackModalOpen]);

  if (!question) return null;

  return (
    <StudyQuestionBoxBlock className={className}>
      <div className="study-question-box-header">
        <div className="study-question-box-number-and-title">
          {questionNumber > 0 && (
            <p className="study-question-box-number">{questionNumber}번</p>
          )}
          {hasExamTitle && (
            <div className="study-question-exam-title">
              {question?.mockExam?.title}
            </div>
          )}
          {title && <div className="study-question-exam-title">{title}</div>}
        </div>
        <div className="study-question-box-header-rignt-button-wrapper">
          {hasQuestionLink && (
            <Link
              href={`/question/${question.id}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkOutlined />
            </Link>
          )}
          {isMyQuestion && (
            <a
              href={`/question/${question.id}/edit`}
              target="_blank"
              rel="noreferrer noopener"
              className="study-question-edit-button"
            >
              <Button type="dashed" size="small">
                수정
              </Button>
            </a>
          )}
          <Bookmark
            onClick={(e) => onClickBookmark(e)}
            role="button"
            active={!!question?.isBookmarked}
            className="study-question-box-bookmark"
          />
        </div>
      </div>
      <div className="study-question-box-question">
        {parse(question.question || '')}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isVisibleImage &&
          question.question_img &&
          question.question_img?.length > 0 &&
          question.question_img[0].url && (
            <Image
              className="study-question-box-image"
              src={question.question_img[0].url}
              alt="문제이미지"
            />
          )}
      </div>
      {isFeedbackModalOpen && (
        <QuestionFeedbackModal
          addFeedback={addFeedback}
          editFeedback={editFeedback}
          question={question}
          open={isFeedbackModalOpen}
          onCancel={() => setIsFeedbackModalOpen(false)}
          onClose={() => setIsFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
        />
      )}
      {isBookmarkInfoModalOpen && (
        <StudyBookmarkInfoModal
          open={isBookmarkInfoModalOpen}
          onCancel={() => setIsBookmarkInfoModalOpen(false)}
        />
      )}
    </StudyQuestionBoxBlock>
  );
};

export default StudyQuestionBox;
