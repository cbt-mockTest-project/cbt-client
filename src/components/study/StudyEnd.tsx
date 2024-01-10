import useQuestions from '@lib/hooks/useQuestions';
import { Button, Result, message } from 'antd';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import SwiperCore from 'swiper';
import { MockExamQuestion, QuestionState } from 'types';
import StudyResultChart from './StudyResultChart';
import { useRouter } from 'next/router';

const StudyEndBlock = styled.div`
  .study-end-button-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    .study-end-button-top-wrapper {
      display: flex;
      gap: 5px;
    }
    .study-end-finish-button {
      width: 205.65px;
    }
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
      <Result
        icon={<StudyResultChart scoreCounts={scoreCounts} />}
        title="학습이 종료되었습니다."
        extra={
          <div className="study-end-button-wrapper">
            <div className="study-end-button-top-wrapper">
              <Button
                onClick={() => {
                  swiper.slideTo(0, 0);
                }}
              >
                다시 풀기
              </Button>
              <Button onClick={handleRetryExam}>틀린문제 보기</Button>
            </div>
            <Button
              className="study-end-finish-button"
              type="primary"
              onClick={router.back}
            >
              종료하기
            </Button>
          </div>
        }
      />
    </StudyEndBlock>
  );
};

export default StudyEnd;
