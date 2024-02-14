import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const McqReactiveStudyFooterBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  .mcq-reactive-study-footer-move-button {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
  .mcq-reactive-study-footer-finish-button {
    height: 50px;
    font-size: 20px;
  }
`;

interface McqReactiveStudyFooterProps {
  questionLength: number;
}

const McqReactiveStudyFooter: React.FC<McqReactiveStudyFooterProps> = ({
  questionLength,
}) => {
  const router = useRouter();
  const { isLastQuestion, isFirstQuestion } = useMemo(
    () => ({
      isLastQuestion: questionLength === Number(router.query.qestionIndex),
      isFirstQuestion: Number(router.query.qestionIndex) === 1,
    }),
    [router.query.qestionIndex, questionLength]
  );

  const handleMove = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (isFirstQuestion) return;
      router.push({
        query: {
          ...router.query,
          qestionIndex: Number(router.query.qestionIndex) - 1,
        },
      });
    }
    if (direction === 'next') {
      if (isLastQuestion) return;
      router.push({
        query: {
          ...router.query,
          qestionIndex: Number(router.query.qestionIndex) + 1,
        },
      });
    }
  };
  return (
    <McqReactiveStudyFooterBlock>
      <Button
        size="large"
        shape="circle"
        className="mcq-reactive-study-footer-move-button"
        onClick={() => handleMove('prev')}
        disabled={isFirstQuestion}
      >
        <LeftOutlined />
      </Button>
      {isLastQuestion ? (
        <Button className="mcq-reactive-study-footer-finish-button">
          시험 종료
        </Button>
      ) : (
        <Button
          size="large"
          shape="circle"
          className="mcq-reactive-study-footer-move-button"
          onClick={() => handleMove('next')}
        >
          <RightOutlined />
        </Button>
      )}
    </McqReactiveStudyFooterBlock>
  );
};

export default McqReactiveStudyFooter;
