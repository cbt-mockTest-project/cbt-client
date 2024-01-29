import useQuestions from '@lib/hooks/useQuestions';
import { Button, message } from 'antd';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { MockExamQuestion, QuestionState } from 'types';
import { useRouter } from 'next/router';
import StudyResultCard from './StudyResultCard';
import palette from '@styles/palette';
import useQuestionsScore from '@lib/hooks/useQuestionsScore';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';

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
  .study-end-retry-button-content {
    display: flex;
    align-items: center;
    svg {
      font-size: 20px;
    }
  }
  .study-end-wrong-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    .study-end-wrong-question-title {
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;

      svg {
        font-size: 20px;
      }
    }
    .study-end-wrong-question-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .solution-mode-question-card {
        background-color: white;
      }
      .study-control-box {
        margin: 0;
      }
    }
  }
`;

interface StudyEndProps {}

const StudyEnd: React.FC<StudyEndProps> = () => {
  const router = useRouter();

  const { setQuestions } = useQuestions();
  const { questionsForScore } = useQuestionsScore();
  const highScoreLength = useMemo(
    () =>
      questionsForScore.filter(
        (question: MockExamQuestion) =>
          question.myQuestionState === QuestionState.High
      ).length,
    [questionsForScore]
  );
  const lowScoreLength = useMemo(
    () =>
      questionsForScore.filter(
        (question: MockExamQuestion) =>
          question.myQuestionState === QuestionState.Row
      ).length,
    [questionsForScore]
  );
  const middleScoreLength = useMemo(
    () =>
      questionsForScore.filter(
        (question: MockExamQuestion) =>
          question.myQuestionState === QuestionState.Middle
      ).length,
    [questionsForScore]
  );
  const scoreCounts = useMemo(
    () => ({
      highScoreLength,
      lowScoreLength,
      middleScoreLength,
      coreScoreLength:
        questionsForScore.length -
        highScoreLength -
        lowScoreLength -
        middleScoreLength,
    }),
    [
      highScoreLength,
      middleScoreLength,
      lowScoreLength,
      questionsForScore.length,
    ]
  );

  useEffect(() => {
    if (router.query.tab === 'end') {
      setQuestions(questionsForScore);
    }
  }, [router.query.tab]);

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
            setQuestions(questionsForScore);
            delete router.query.tab;
            router.push({
              query: {
                ...router.query,
                qIndex: 0,
              },
            });
          }}
        >
          다시 풀기
        </Button>
        <Button
          className="study-end-finish-button"
          type="primary"
          onClick={router.back}
        >
          종료하기
        </Button>
      </div>
      <div className="study-end-wrong-wrapper">
        <div className="study-end-wrong-question-title">
          <ChangeHistoryIcon />, <ClearIcon /> &nbsp; 문제
        </div>
        <div className="study-end-wrong-question-list">
          {questionsForScore
            .filter(
              (question: MockExamQuestion) =>
                question.myQuestionState === QuestionState.Row ||
                question.myQuestionState === QuestionState.Middle
            )
            .map((question, index) => (
              <SolutionModeCardItem
                key={question.id}
                defaultQuestion={question}
                index={index}
                isAnswerAllHidden={false}
              />
            ))}
        </div>
      </div>
    </StudyEndBlock>
  );
};

export default StudyEnd;
