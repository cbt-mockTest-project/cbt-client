import useQuestions from '@lib/hooks/useQuestions';
import { Button } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestion, QuestionState } from 'types';
import { useRouter } from 'next/router';
import StudyResultCard from './StudyResultCard';
import palette from '@styles/palette';
import useQuestionsScore from '@lib/hooks/useQuestionsScore';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import { LocalStorage } from '@lib/utils/localStorage';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { useCheckIfCategoryEvaluated } from '@lib/graphql/hook/useCategoryEvaluation';
import useAuth from '@lib/hooks/useAuth';
import StudyEndCategoryReviewModal from './StudyEndCategoryReviewModal';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';

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
  const localStorage = new LocalStorage();
  const { setQuestions } = useQuestions();
  const { updateQuestionIndexInfo } = useCurrentQuestionIndex();
  const { questionsForScore } = useQuestionsScore();
  const { isLoggedIn } = useAuth();
  const [checkIfCategoryEvaluated] = useCheckIfCategoryEvaluated();
  const [isCategoryReviewModalOpen, setIsCategoryReviewModalOpen] =
    useState(false);
  const categoryId = typeof router.query.categoryId
    ? Number(router.query.categoryId)
    : null;
  const countQuestionsByScoreState = useCallback(() => {
    let highScoreLength = 0;
    let lowScoreLength = 0;
    let middleScoreLength = 0;

    questionsForScore.forEach((question: MockExamQuestion) => {
      switch (question.myQuestionState) {
        case QuestionState.High:
          highScoreLength++;
          break;
        case QuestionState.Row: // Assuming "Row" was a typo and should be "Low"
          lowScoreLength++;
          break;
        case QuestionState.Middle:
          middleScoreLength++;
          break;
        // No default case needed since we cover all cases
      }
    });

    return {
      highScoreLength,
      lowScoreLength,
      middleScoreLength,
      coreScoreLength:
        questionsForScore.length -
        highScoreLength -
        lowScoreLength -
        middleScoreLength,
    };
  }, [questionsForScore]);

  const scoreCounts = useMemo(countQuestionsByScoreState, [
    countQuestionsByScoreState,
  ]);
  useEffect(() => {
    if (router.query.tab === 'end') {
      setQuestions(questionsForScore);
    }
  }, [router.query.tab]);

  useEffect(() => {
    if (router.query.tab === 'end') {
      if (router.query.examId || router.query.examIds) {
        updateQuestionIndexInfo(0);
      }
    }
  }, [router.query.examId, router.query.examIds, router.query.tab]);

  useEffect(() => {
    if (categoryId && isLoggedIn) {
      checkIfCategoryEvaluated({
        variables: {
          input: {
            categoryId,
          },
        },
      }).then((res) => {
        const checkIfCategoryEvaluatedResponse =
          res.data?.checkIfCategoryEvaluated;
        if (!checkIfCategoryEvaluatedResponse.ok) return;
        if (!checkIfCategoryEvaluatedResponse.isEvaluated) {
          setIsCategoryReviewModalOpen(true);
        }
      });
    }
  }, [categoryId]);

  const handleEndExam = () => {
    const lastVisitedCategory = localStorage.get(LAST_VISITED_CATEGORY);
    if (lastVisitedCategory) {
      router.push(lastVisitedCategory);
    } else {
      router.push('/');
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
          onClick={handleEndExam}
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
      {categoryId && (
        <StudyEndCategoryReviewModal
          categoryId={categoryId}
          open={isCategoryReviewModalOpen}
          onCancel={() => setIsCategoryReviewModalOpen(false)}
        />
      )}
    </StudyEndBlock>
  );
};

export default StudyEnd;
