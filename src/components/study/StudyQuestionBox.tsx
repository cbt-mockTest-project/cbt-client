import Bookmark from '@components/common/bookmark/Bookmark';
import parse from 'html-react-parser';
import React from 'react';
import styled from 'styled-components';
import { Image } from 'antd';
import { MockExamQuestion } from 'types';
import palette from '@styles/palette';
import { useRouter } from 'next/router';

const StudyQuestionBoxBlock = styled.div`
  .study-question-box-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .study-question-box-bookmark {
    height: 24px;
  }
  .study-question-box-number {
    font-weight: bold;
    width: fit-content;
    flex-shrink: 0;
    color: ${palette.colorSubText};
  }
  .study-question-box-question {
    word-break: break-all;
    white-space: pre-wrap;
  }
  .study-question-box-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .study-question-exam-title {
    font-size: 14px;
    color: ${palette.colorSubText};
  }
`;

interface StudyQuestionBoxProps {
  saveBookmark: (question: MockExamQuestion) => void;
  questionNumber?: number;
  question: MockExamQuestion;
  className?: string;
  title?: string;
}

const StudyQuestionBox: React.FC<StudyQuestionBoxProps> = ({
  saveBookmark,
  question,
  questionNumber,
  className = '',
  title,
}) => {
  const router = useRouter();
  const isMultipleSelectMode = !!router.query.examIds;
  return (
    <StudyQuestionBoxBlock className={className}>
      <div className="study-question-box-header">
        {questionNumber && (
          <p className="study-question-box-number">{questionNumber}번</p>
        )}
        <Bookmark
          onClick={() => saveBookmark(question)}
          role="button"
          active={!!question.isBookmarked}
          className="study-question-box-bookmark"
        />
        {isMultipleSelectMode && (
          <div className="study-question-exam-title">
            {question.mockExam?.title}
          </div>
        )}
        {title && <div className="study-question-exam-title">{title}</div>}
      </div>
      <div className="study-question-box-question">
        {parse(question.question || '')}
      </div>
      {question.question_img && question.question_img?.length > 0 && (
        <Image
          className="study-question-box-image"
          src={question.question_img[0].url}
          alt="문제이미지"
        />
      )}
    </StudyQuestionBoxBlock>
  );
};

export default StudyQuestionBox;
