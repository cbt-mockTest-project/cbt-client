import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React, { SetStateAction } from 'react';
import styled from 'styled-components';

interface MoveQuestionProps {
  questionIndex: number;
  questionCount: number;
  setModalState: React.Dispatch<SetStateAction<boolean>>;
}

const MoveQuestion: React.FC<MoveQuestionProps> = ({
  questionCount,
  questionIndex,
  setModalState,
}) => {
  const router = useRouter();
  const goPrevQuestion = () => {
    if (questionIndex > 1) {
      const query = { ...router.query, q: String(questionIndex - 1) };
      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  };
  const goNextQuestion = () => {
    if (questionIndex >= questionCount) {
      setModalState(true);
    }
    if (questionIndex < questionCount || questionCount === 0) {
      const query = { ...router.query, q: String(questionIndex + 1) };
      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <MoveQuestionContainer>
      <button
        className="exam-question-move-button"
        type="button"
        onClick={goPrevQuestion}
      >
        <CaretLeftOutlined />
      </button>
      <button
        className="exam-question-move-button"
        type="button"
        onClick={goNextQuestion}
      >
        <CaretRightOutlined />
      </button>
    </MoveQuestionContainer>
  );
};

export default MoveQuestion;

const MoveQuestionContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 999;
  bottom: 80px;
  right: 30px;
  gap: 10px;

  .exam-question-move-button-label {
    margin-left: 40px;
    margin-right: 5px;
  }
  .exam-question-move-button {
    position: relative;
    transition: all 0.2s ease-in;
    padding: 10px;
    border: 1px solid ${palette.blue_200};
    border-radius: 100%;
    display: flex;
    justify-content: content;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: ${({ theme }) => theme.color('colorPrimary')};
    color: white;
    svg {
      width: 23px;
      height: 23px;
    }
  }
  @media (max-width: ${responsive.medium}) {
    position: fixed;
    bottom: 65px;
    right: 20px;
  }
`;
