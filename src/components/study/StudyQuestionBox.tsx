import Bookmark from '@components/common/bookmark/Bookmark';
import parse from 'html-react-parser';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Image, Popover } from 'antd';
import { MockExamQuestion } from 'types';
import palette from '@styles/palette';
import useAuth from '@lib/hooks/useAuth';
import { EditOutlined } from '@ant-design/icons';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import useQuestions from '@lib/hooks/useQuestions';
import StudyBookmarkInfoModal from './StudyBookmarkInfoModal';

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
            color: ${palette.antd_blue_02};
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
    color: ${palette.colorSubText};
  }
  .study-question-box-question {
    word-break: break-all;
    white-space: pre-wrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .study-question-box-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .study-question-exam-title {
    font-size: 12px;
    color: ${palette.colorSubText};
  }
  .study-question-edit-button {
    margin-left: auto;
  }
  .study-question-box-answer-percentage {
    position: relative;
    bottom: 5px;
    font-size: 12px;
    font-weight: bold;
    color: ${palette.colorSubText};
  }
`;

interface StudyQuestionBoxProps {
  saveBookmark: (question: MockExamQuestion) => void;
  questionNumber?: number;
  question: MockExamQuestion;
  className?: string;
  title?: string;
  onChangeIsFeedbackModalOpen?: (value: boolean) => void;
}

const StudyQuestionBox: React.FC<StudyQuestionBoxProps> = ({
  saveBookmark,
  question,
  questionNumber,
  className = '',
  title,
  onChangeIsFeedbackModalOpen,
}) => {
  const [isBookmarkInfoModalOpen, setIsBookmarkInfoModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { addFeedback, editFeedback } = useQuestions();
  const { user, handleCheckLogin, handleUpdateUserCache } = useAuth();
  const isMyQuestion = useMemo(() => {
    if (!user) return false;
    return user.id === question?.user.id;
  }, [user, question]);

  const handleOpenFeedbackModal: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    e.stopPropagation();
    if (!handleCheckLogin()) return;
    setIsFeedbackModalOpen(true);
  };

  const onClickBookmark = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    saveBookmark(question);
    if (!user.hasBookmarkedBefore) {
      setIsBookmarkInfoModalOpen(true);
      handleUpdateUserCache({ hasBookmarkedBefore: true });
    }
  };

  useEffect(() => {
    if (onChangeIsFeedbackModalOpen) {
      onChangeIsFeedbackModalOpen(isFeedbackModalOpen);
    }
  }, [onChangeIsFeedbackModalOpen]);

  return (
    <StudyQuestionBoxBlock className={className}>
      <div className="study-question-box-header">
        <div className="study-question-box-number-and-title">
          {questionNumber > 0 && (
            <p className="study-question-box-number">{questionNumber}번</p>
          )}
          <div className="study-question-exam-title">
            {question?.mockExam?.title}
          </div>
          {title && <div className="study-question-exam-title">{title}</div>}
        </div>
        <div className="study-question-box-header-rignt-button-wrapper">
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
          {[12318, 1].includes(question.user.id) && (
            <Popover content="답안 추가">
              <div
                className="study-question-box-header-rignt-button-edit"
                onClick={handleOpenFeedbackModal}
              >
                <EditOutlined />
              </div>
            </Popover>
          )}
          <Bookmark
            onClick={onClickBookmark}
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
        {question.question_img &&
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
