import useQuestions from '@lib/hooks/useQuestions';
import { Button, message } from 'antd';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MockExamQuestion, QuestionState } from 'types';
import { useRouter } from 'next/router';
import StudyResultCard from './StudyResultCard';
import palette from '@styles/palette';

const StudyEndBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  .study-end-header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 0;
    .study-end-header-title {
      font-size: 20px;
      font-weight: bold;
    }
    .study-end-header-desc {
      font-size: 16px;
      color: ${palette.colorSubText};
    }
  }
  .study-end-result-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .study-end-result-title {
    font-size: 18px;
    font-weight: bold;
  }
  .study-end-button-wrapper {
    display: flex;
    gap: 10px;
  }
`;

interface StudyEndProps {
  swiper: any;
}

const StudyEnd: React.FC<StudyEndProps> = ({ swiper }) => {
  const router = useRouter();
  const { questions, filterQuestions } = useQuestions();
  const highScoreLength = useMemo(
    () =>
      questions.filter(
        (question: MockExamQuestion) =>
          question.myQuestionState === QuestionState.High
      ).length,
    [questions]
  );
  const lowScoreLength = useMemo(
    () =>
      questions.filter(
        (question: MockExamQuestion) =>
          question.myQuestionState === QuestionState.Row
      ).length,
    [questions]
  );
  const scoreCounts = useMemo(
    () => ({
      highScoreLength,
      lowScoreLength,
      coreScoreLength: questions.length - highScoreLength - lowScoreLength,
    }),
    [highScoreLength, lowScoreLength, questions.length]
  );
  const handleRetryExam = async () => {
    try {
      const hasQuestionWithLowScore = questions.some(
        (question: MockExamQuestion) =>
          question.myQuestionState === QuestionState.Row
      );
      if (!hasQuestionWithLowScore)
        return message.error('틀린 문제가 없습니다.');
      await router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          mode: 'end',
        },
      });
      filterQuestions([QuestionState.Row]);
    } catch {
      message.error('다시 시도해주세요.');
    }
  };
  return (
    <StudyEndBlock>
      <div className="study-end-header">
        <div className="study-end-header-title">학습이 종료되었습니다.</div>
        <div className="study-end-header-desc">학습 결과를 확인해 보세요.</div>
      </div>
      <div className="study-end-result-wrapper">
        <div className="study-end-result-title">학습 결과</div>
        <StudyResultCard scoreCounts={scoreCounts} />
      </div>
      <div className="study-end-button-wrapper">
        <Button
          onClick={() => {
            swiper.slideTo(0, 0);
          }}
        >
          다시 풀기
        </Button>
        <Button onClick={handleRetryExam}>틀린문제 보기</Button>
        <Button
          className="study-end-finish-button"
          type="primary"
          onClick={router.back}
        >
          종료하기
        </Button>
      </div>
    </StudyEndBlock>
  );
};

export default StudyEnd;
