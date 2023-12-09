import Bookmark from '@components/common/bookmark/Bookmark';
import parse from 'html-react-parser';
import React from 'react';
import styled from 'styled-components';
import { Image } from 'antd';
import { MockExamQuestion } from 'types';
import palette from '@styles/palette';

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
    color: ${palette.subTextColor};
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
`;

interface StudyQuestionBoxProps {
  saveBookmark: (question: MockExamQuestion) => void;
  questionNumber: number;
  question: MockExamQuestion;
}

const StudyQuestionBox: React.FC<StudyQuestionBoxProps> = ({
  saveBookmark,
  question,
  questionNumber,
}) => {
  return (
    <StudyQuestionBoxBlock>
      <div className="study-question-box-header">
        <p className="study-question-box-number">{questionNumber}번</p>
        <Bookmark
          onClick={() => saveBookmark(question)}
          role="button"
          active={!!question.isBookmarked}
          className="study-question-box-bookmark"
        />
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
