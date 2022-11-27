import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface MoveQuestionProps {
  questionIndex: number;
  questionCount: number;
}

const MoveQuestion: React.FC<MoveQuestionProps> = ({
  questionCount,
  questionIndex,
}) => {
  const router = useRouter();
  const goPrevQuestion = () => {
    if (questionIndex > 1) {
      const query = { ...router.query, q: String(questionIndex - 1) };
      router.push({
        pathname: router.pathname,
        query,
      });
    }
  };
  const goNextQuestion = () => {
    if (questionIndex >= questionCount) {
      alert('테스트를 종료할꺼냐');
    }
    if (questionIndex < questionCount || questionCount === 0) {
      const query = { ...router.query, q: String(questionIndex + 1) };
      router.push({
        pathname: router.pathname,
        query,
      });
    }
  };
  return (
    <MoveQuestionContainer>
      <span className="exam-question-move-button-label select-none">
        문제이동
      </span>
      <button className="exam-question-move-button" onClick={goPrevQuestion}>
        <CaretLeftOutlined />
      </button>
      <button className="exam-question-move-button" onClick={goNextQuestion}>
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
