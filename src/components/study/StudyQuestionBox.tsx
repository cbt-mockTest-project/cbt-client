import Bookmark from '@components/common/bookmark/Bookmark';
import parse from 'html-react-parser';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Image, Popover } from 'antd';
import { MockExamQuestion } from 'types';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import useAuth from '@lib/hooks/useAuth';
import { AlertOutlined, EditOutlined } from '@ant-design/icons';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import useQuestions from '@lib/hooks/useQuestions';

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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { addFeedback, editFeedback } = useQuestions();
  const router = useRouter();
  const { user, handleCheckLogin } = useAuth();
  const isMyQuestion = useMemo(() => {
    if (!user) return false;
    return user.id === question.user.id;
  }, [user, question]);
  const isMultipleSelectMode = !!router.query.examIds;

  const handleOpenFeedbackModal: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    e.stopPropagation();
    if (!handleCheckLogin()) return;
    setIsFeedbackModalOpen(true);
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

          {isMultipleSelectMode && (
            <div className="study-question-exam-title">
              {question.mockExam?.title}
            </div>
          )}
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
          <Popover content="답안 추가">
            <div
              className="study-question-box-header-rignt-button-edit"
              onClick={handleOpenFeedbackModal}
            >
              <EditOutlined />
            </div>
          </Popover>
          <Bookmark
            onClick={(e) => {
              e.stopPropagation();
              saveBookmark(question);
            }}
            role="button"
            active={!!question.isBookmarked}
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
    </StudyQuestionBoxBlock>
  );
};

export default StudyQuestionBox;
