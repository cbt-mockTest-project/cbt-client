import BasicCard from '@components/common/card/BasicCard';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import useQuestions from '@lib/hooks/useQuestions';
import palette from '@styles/palette';
import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore from 'swiper';
import { MockExamQuestion } from 'types';

const CardModeItemBlock = styled.div`
  .card-basic-wrapper {
    height: calc(100vh - 157px);
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 5px; /* 스크롤 바의 너비 */
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${palette.subTextColor}; /* 스크롤 막대의 색상 */
      border-radius: 6px; /* 둥근 모서리 */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: grey;
    }
    ::-webkit-scrollbar-track {
      background-color: ${palette.containerBackgroundColor}; /* 스크롤 바의 전체 색상 */
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
    height: calc(100vh - 157px);
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
    height: calc(100vh - 157px);
    backface-visibility: hidden; /* 카드의 뒷면 숨김 */
  }

  .card-back {
    transform: rotateY(-180deg); /* 뒷면은 기본적으로 뒤집혀 있음 */
  }
`;

interface CardModeItemProps {
  question: MockExamQuestion;
  number: number;
  swiper: SwiperCore;
}

const CardModeItem: React.FC<CardModeItemProps> = ({
  question,
  number,
  swiper,
}) => {
  const { saveBookmark, saveQuestionState } = useQuestions();
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <CardModeItemBlock>
      <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-front">
          <BasicCard className="card-basic-wrapper">
            <div className="card-container">
              <StudyQuestionBox
                className="study-question-box"
                question={question}
                saveBookmark={saveBookmark}
                questionNumber={number}
              />
            </div>
          </BasicCard>
        </div>
        <div className="card-back">
          <BasicCard className="card-basic-wrapper">
            <div className="card-container">
              <StudyAnswerBox
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
        additionalControlButton={
          <Button onClick={() => setIsFlipped((prev) => !prev)}>
            {isFlipped ? '문제' : '정답'}
          </Button>
        }
        saveQuestionState={saveQuestionState}
        swiper={swiper}
      />
    </CardModeItemBlock>
  );
};

export default CardModeItem;