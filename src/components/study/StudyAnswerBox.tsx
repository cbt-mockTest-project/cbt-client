import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackList from '@components/solutionMode/SolutionModeFeedbackList';
import { Button, Image } from 'antd';
import palette from '@styles/palette';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';
import EditorStyle from '@styles/editorStyle';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import useAuth from '@lib/hooks/useAuth';

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
    ${EditorStyle};
  }
  .study-answer-box-question-card-answer-wrapper {
    transition: opacity 0.2s ease-in-out;
  }
  .study-answer-box-question-card-anwswer-wrapper.hidden {
    opacity: 0;
  }

  .study-answer-box-box-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .study-answer-footer {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${palette.colorBorderLight};
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { handleCheckLogin } = useAuth();
  const onClickOpenFeedbackModal = () => {
    if (!handleCheckLogin()) {
      return;
    }
    setIsFeedbackModalOpen(true);
  };
  if (!question) return null;
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
      <div className="study-answer-footer" onClick={onClickOpenFeedbackModal}>
        <Button shape="circle">➕</Button>
        <div>답안 추가</div>
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
    </StudyAnswerBoxBlock>
  );
};

export default StudyAnswerBox;
