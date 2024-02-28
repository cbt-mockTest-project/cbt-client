import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import { Tooltip } from '@mui/material';
import palette from '@styles/palette';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const CardModeControlBoxBlock = styled.div`
  margin-top: 10px;
  display: none;
  .card-mode-control-button-wrapper {
    justify-content: space-between;
    align-items: center;
    display: flex;
    .card-mode-control-button {
      padding: 5px;
      margin: 0;
      border: 2px solid ${palette.colorBorder};
      color: ${palette.colorText};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-in-out;
      svg {
        font-size: 20px;
      }
    }
  }

  @media (max-width: ${responsive.large}) {
    display: block;
  }
`;

interface CardModeControlBoxProps {
  flipCard: () => void;
  isFlipped: boolean;
}

const CardModeControlBox: React.FC<CardModeControlBoxProps> = ({
  flipCard,
  isFlipped,
}) => {
  const { questions } = useQuestions();
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  return (
    <CardModeControlBoxBlock>
      <BasicCard type="primary">
        <div className="card-mode-control-button-wrapper">
          <Tooltip title={isMobile ? '' : 'shift + <-'}>
            <button
              className="card-mode-control-button"
              onClick={() => handleSlidePrev()}
            >
              <LeftOutlined />
            </button>
          </Tooltip>
          <Tooltip title={isMobile ? '' : 'shift + spacebar'}>
            <Button
              className="card-mode-control-show-answer-button"
              onClick={() => flipCard()}
            >
              <span>{isFlipped ? '문제보기' : '정답보기'}</span>
            </Button>
          </Tooltip>
          <Tooltip title={isMobile ? '' : 'shift + ->'}>
            <button
              className="card-mode-control-button"
              onClick={() => handleSlideNext(questions.length)}
            >
              <RightOutlined />
            </button>
          </Tooltip>
        </div>
      </BasicCard>
    </CardModeControlBoxBlock>
  );
};

export default CardModeControlBox;
