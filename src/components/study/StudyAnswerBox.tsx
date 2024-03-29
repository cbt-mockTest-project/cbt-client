import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackList from '@components/solutionMode/SolutionModeFeedbackList';
import { Image } from 'antd';
import palette from '@styles/palette';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';

const StudyAnswerBoxBlock = styled.div`
  position: relative;
  .study-answer-box-question-card-answer-label {
    font-weight: bold;
    color: ${palette.colorSubText};
  }
  .study-answer-box-question-card-answer {
    word-break: break-all;
    white-space: pre-wrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
  editFeedback: (editFeedbackInput: EditFeedbackInput) => Promise<void>;
  addFeedback: (editFeedbackInput: AddFeedbackInput) => Promise<void>;
  deleteFeedback: (deleteFeedbackInput: DeleteFeedbackInput) => Promise<void>;
  updateFeedbackRecommendation: (
    updateFeedbackRecommendationInput: UpdateFeedbackRecommendationInput
  ) => Promise<void>;
}

const StudyAnswerBox: React.FC<StudyAnswerBoxProps> = ({
  isAnswerHidden = false,
  question,
  editFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedbackRecommendation,
  className = '',
}) => {
  return (
    <StudyAnswerBoxBlock className={className}>
      <div
        className={`study-answer-box-question-card-anwswer-wrapper ${
          isAnswerHidden ? 'hidden' : ''
        }`}
      >
        <div className="study-answer-box-question-card-answer">
          {parse(question.solution || '')}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            width: 'fit-content',
          }}
        >
          {question.solution_img &&
            question.solution_img.length > 0 &&
            question.solution_img[0].url && (
              <Image
                className="study-answer-box-box-image"
                src={question.solution_img[0].url}
                alt="문제이미지"
              />
            )}
        </div>
        <SolutionModeFeedbackList
          question={question}
          editFeedback={editFeedback}
          addFeedback={addFeedback}
          deleteFeedback={deleteFeedback}
          updateFeedbackRecommendation={updateFeedbackRecommendation}
        />
      </div>
    </StudyAnswerBoxBlock>
  );
};

export default StudyAnswerBox;
