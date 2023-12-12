import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackList from '@components/solutionMode/SolutionModeFeedbackList';
import { Image } from 'antd';
import palette from '@styles/palette';

const StudyAnswerBoxBlock = styled.div`
  .study-answer-box-question-card-answer-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: ${palette.subTextColor};
  }
  .study-answer-box-question-card-answer {
    word-break: break-all;
    white-space: pre-wrap;
  }
  .study-answer-box-question-card-answer-wrapper {
    transition: opacity 0.2s ease-in-out;
  }
  .study-answer-box-question-card-anwswer-wrapper.hidden {
    opacity: 0;
  }
  .study-answer-box-question-card-answer {
    word-break: break-all;
    white-space: pre-wrap;
  }
  .study-answer-box-box-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
`;

interface StudyAnswerBoxProps {
  isAnswerHidden?: boolean;
  question: MockExamQuestion;
  className?: string;
}

const StudyAnswerBox: React.FC<StudyAnswerBoxProps> = ({
  isAnswerHidden = false,
  question,
  className = '',
}) => {
  return (
    <StudyAnswerBoxBlock className={className}>
      <p className="study-answer-box-question-card-answer-label">정답</p>
      <div
        className={`study-answer-box-question-card-anwswer-wrapper ${
          isAnswerHidden ? 'hidden' : ''
        }`}
      >
        <div className="study-answer-box-question-card-answer">
          {parse(question.solution || '')}
        </div>
        <SolutionModeFeedbackList question={question} />
        {question.solution_img && question.solution_img.length > 0 && (
          <Image
            className="study-answer-box-box-image"
            src={question.solution_img[0].url}
            alt="문제이미지"
          />
        )}
      </div>
    </StudyAnswerBoxBlock>
  );
};

export default StudyAnswerBox;
