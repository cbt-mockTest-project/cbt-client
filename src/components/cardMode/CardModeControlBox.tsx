import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
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
  swiper: any;
  flipCard: () => void;
  isFlipped: boolean;
}

const CardModeControlBox: React.FC<CardModeControlBoxProps> = ({
  swiper,
  flipCard,
  isFlipped,
}) => {
  const { questions } = useQuestions();
  const router = useRouter();
  const qIndex =
    typeof router.query.qIndex === 'string' ? Number(router.query.qIndex) : 0;
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  return (
    <CardModeControlBoxBlock>
      <BasicCard type="primary">
        <div className="card-mode-control-button-wrapper">
          <button
            className="card-mode-control-button"
            onClick={() => handleSlidePrev(swiper)}
          >
            <LeftOutlined />
          </button>
          <Button>
            <span onClick={flipCard}>
              {isFlipped ? '문제보기' : '정답보기'}
            </span>
          </Button>
          <button
            className="card-mode-control-button"
            onClick={() => handleSlideNext(questions.length, swiper)}
          >
            <RightOutlined />
          </button>
        </div>
      </BasicCard>
    </CardModeControlBoxBlock>
  );
};

export default CardModeControlBox;
