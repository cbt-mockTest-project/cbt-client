import BasicCard from '@components/common/card/BasicCard';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestion, QuestionState } from 'types';
import CardModeControlBox from './CardModeControlBox';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';
import { useRouter } from 'next/router';

const CardModeItemBlock = styled.div`
  .card-basic-wrapper {
    height: calc(100vh - 210px);
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 5px; /* 스크롤 바의 너비 */
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${palette.colorSubText}; /* 스크롤 막대의 색상 */
      border-radius: 6px; /* 둥근 모서리 */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: grey;
    }
    ::-webkit-scrollbar-track {
      background-color: ${palette.colorContainerBg}; /* 스크롤 바의 전체 색상 */
      border-radius: 6px; /* 둥근 모서리 */
    }
  }
  .study-control-box {
    margin-top: 10px;
  }
  .card-container {
    perspective: 1000px; /* 3D 효과를 위한 원근감 */
  }

  .card {
    height: calc(100vh - 210px);
    transform-style: preserve-3d;
    transition: transform 0.8s; /* 플립 애니메이션 속도 */
  }

  .card.is-flipped {
    transform: rotateY(180deg); /* 마우스 오버 시 카드가 180도 회전 */
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: calc(100vh - 210px);
    backface-visibility: hidden; /* 카드의 뒷면 숨김 */
  }

  .card-back {
    transform: rotateY(-180deg); /* 뒷면은 기본적으로 뒤집혀 있음 */
  }
`;

interface CardModeItemProps {
  question: MockExamQuestion;
  handleAddFeedback: (
    addFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
  handleDeleteFeedback: ({
    question,
    feedback,
  }: Omit<DeleteFeedbackInput, 'setQuestion'>) => Promise<void>;
  handleEditFeedback: (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
  handleUpdateFeedbackRecommendation: ({
    type,
    myRecommendationStatus,
    question,
    feedback,
  }: Omit<UpdateFeedbackRecommendationInput, 'setQuestion'>) => Promise<void>;
  handleSaveBookmark: (question: MockExamQuestion) => Promise<void>;
  handleSaveQuestionState: (
    question: MockExamQuestion,
    state: QuestionState
  ) => Promise<void>;
  number: number;
}

const CardModeItem: React.FC<CardModeItemProps> = ({
  question,
  handleAddFeedback,
  handleDeleteFeedback,
  handleEditFeedback,
  handleUpdateFeedbackRecommendation,
  handleSaveBookmark,
  handleSaveQuestionState,
  number,
}) => {
  const router = useRouter();
  const activeIndex = Number(router.query.activeIndex);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardModeItemBlock>
      <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
        <div
          className="card-front"
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          <BasicCard className="card-basic-wrapper" type="primary">
            <div className="card-container">
              <StudyQuestionBox
                className="study-question-box"
                question={question}
                saveBookmark={handleSaveBookmark}
                questionNumber={number}
              />
            </div>
          </BasicCard>
        </div>
        <div
          className="card-back"
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          <BasicCard className="card-basic-wrapper" type="primary">
            <div className="card-container">
              <StudyAnswerBox
                addFeedback={handleAddFeedback}
                editFeedback={handleEditFeedback}
                deleteFeedback={handleDeleteFeedback}
                updateFeedbackRecommendation={
                  handleUpdateFeedbackRecommendation
                }
                className="study-answer-box"
                question={question}
              />
            </div>
          </BasicCard>
        </div>
      </div>

      <StudyControlBox
        className="study-control-box"
        question={question}
        editFeedback={handleEditFeedback}
        addFeedback={handleAddFeedback}
        saveQuestionState={handleSaveQuestionState}
        answerToggleOption={{
          isAnswerHidden: !isFlipped,
          setIsAnswerHidden: setIsFlipped,
        }}
      />
      <CardModeControlBox
        isFlipped={isFlipped}
        flipCard={() => setIsFlipped((el) => !el)}
      />
    </CardModeItemBlock>
  );
};

export default CardModeItem;
