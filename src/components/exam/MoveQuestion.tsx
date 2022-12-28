import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
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
      <span className="exam-question-move-button-label select-none">
        문제이동
      </span>
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
`;
