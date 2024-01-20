import BasicCard from '@components/common/card/BasicCard';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const StudyResultCardBlock = styled.div`
  max-width: 500px;
  .study-result-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .study-result-card-content-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      font-size: 16px;
    }
    .study-result-card-content-label {
    }
    .study-result-card-content-value {
      color: ${palette.antd_blue_02};
    }
  }
`;

interface StudyResultCardProps {
  scoreCounts: {
    highScoreLength: number;
    lowScoreLength: number;
    coreScoreLength: number;
  };
}

const StudyResultCard: React.FC<StudyResultCardProps> = ({ scoreCounts }) => {
  const { highScoreLength, lowScoreLength, coreScoreLength } = scoreCounts;
  const totalScoreLength = highScoreLength + lowScoreLength + coreScoreLength;
  return (
    <StudyResultCardBlock>
      <BasicCard className="study-result-card">
        <div className="study-result-card-content-wrapper">
          <div className="study-result-card-content-label">총 문제 수</div>
          <div className="study-result-card-content-value">
            {totalScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper">
          <div className="study-result-card-content-label">맞은 문제 수</div>
          <div className="study-result-card-content-value">
            {highScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper">
          <div className="study-result-card-content-label">틀린 문제 수</div>
          <div className="study-result-card-content-value">
            {lowScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper">
          <div className="study-result-card-content-label">안 푼 문제 수</div>
          <div className="study-result-card-content-value">
            {coreScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper">
          <div className="study-result-card-content-label">
            정답률(맞은 문제 수 / 총 문제 수)
          </div>
          <div className="study-result-card-content-value">
            {((highScoreLength / totalScoreLength) * 100).toFixed(2)}%
          </div>
        </div>
      </BasicCard>
    </StudyResultCardBlock>
  );
};

export default StudyResultCard;
