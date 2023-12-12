import useQuestions from '@lib/hooks/useQuestions';
import { Button, Result } from 'antd';
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
    text-align: center;
    justify-content: center;
  }
`;

interface StudyEndProps {
  swiper: SwiperCore;
}

const StudyEnd: React.FC<StudyEndProps> = ({ swiper }) => {
  const router = useRouter();
  const { questions } = useQuestions();
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
  return (
    <StudyEndBlock>
      <Result
        icon={<StudyResultChart scoreCounts={scoreCounts} />}
        title="학습이 종료되었습니다."
        extra={
          <div className="study-end-button-wrapper">
            <Button onClick={() => swiper.slideTo(0, 0)}>다시 풀기</Button>
            <Button type="primary">종료하기</Button>
          </div>
        }
      />
    </StudyEndBlock>
  );
};

export default StudyEnd;
