import BasicCard from '../common/card/BasicCard';
import palette from '../../_styles/palette';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { MockExamQuestion, QuestionState } from '../../types';
import { useAppSelector } from '../../_modules/redux/store/configureStore';

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
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        font-size: 20px;
      }
    }
    .study-result-card-content-value {
      color: ${({ theme }) => theme.color('colorPrimary')};
    }
  }
`;

interface StudyResultCardProps {}

const StudyResultCard: React.FC<StudyResultCardProps> = () => {
  const questions = useAppSelector((state) => state.mockExam.questions);
  const countQuestionsByScoreState = useCallback(() => {
    let highScoreLength = 0;
    let lowScoreLength = 0;
    let middleScoreLength = 0;

    questions.forEach((question: MockExamQuestion) => {
      switch (question.myQuestionState) {
        case QuestionState.High:
          highScoreLength++;
          break;
        case QuestionState.Row:
          lowScoreLength++;
          break;
        case QuestionState.Middle:
          middleScoreLength++;
          break;
      }
    });

    return {
      highScoreLength,
      lowScoreLength,
      middleScoreLength,
      coreScoreLength:
        questions.length - highScoreLength - lowScoreLength - middleScoreLength,
    };
  }, [questions]);
  const scoreCounts = useMemo(countQuestionsByScoreState, [
    countQuestionsByScoreState,
  ]);
  const {
    highScoreLength,
    lowScoreLength,
    coreScoreLength,
    middleScoreLength,
  } = scoreCounts;
  const totalScoreLength =
    highScoreLength + lowScoreLength + coreScoreLength + middleScoreLength;
  return (
    <StudyResultCardBlock>
      <BasicCard className="study-result-card">
        <div className="study-result-card-content-wrapper">
          <div className="study-result-card-content-label">총 문제 수</div>
          <div className="study-result-card-content-value">
            {totalScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper high">
          <div className="study-result-card-content-label">
            <PanoramaFishEyeIcon /> 갯수
          </div>
          <div className="study-result-card-content-value">
            {highScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper middle">
          <div className="study-result-card-content-label">
            <ChangeHistoryIcon /> 갯수
          </div>
          <div className="study-result-card-content-value">
            {middleScoreLength}
          </div>
        </div>
        <div className="study-result-card-content-wrapper low">
          <div className="study-result-card-content-label">
            <ClearIcon /> 갯수
          </div>
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
      </BasicCard>
    </StudyResultCardBlock>
  );
};

export default StudyResultCard;
