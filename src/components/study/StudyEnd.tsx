import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import { useRouter } from 'next/router';
import StudyResultCard from './StudyResultCard';
import palette from '@styles/palette';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import { LocalStorage } from '@lib/utils/localStorage';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { useCheckIfCategoryEvaluated } from '@lib/graphql/hook/useCategoryEvaluation';
import useAuth from '@lib/hooks/useAuth';
import StudyEndCategoryReviewModal from './StudyEndCategoryReviewModal';
import useCurrentQuestionIndex from '@lib/hooks/useCurrentQuestionIndex';
import { handleError } from '@lib/utils/utils';
import { useUpsertRecentlyStudiedExams } from '@lib/graphql/hook/useUser';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { uniqueId } from 'lodash';

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
      color: ${({ theme }) => theme.color('colorTextSecondary')};
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
        background-color: ${({ theme }) => theme.color('colorFillAlter')};
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
  const questionLength = useAppSelector(
    (state) => state.mockExam.questions.length
  );
  const { updateQuestionIndexInfo } = useCurrentQuestionIndex();
  const [upsertRecentlyStudiedExams] = useUpsertRecentlyStudiedExams();
  const { isLoggedIn } = useAuth();
  const [checkIfCategoryEvaluated] = useCheckIfCategoryEvaluated();
  const [isCategoryReviewModalOpen, setIsCategoryReviewModalOpen] =
    useState(false);
  const categoryId = typeof router.query.categoryId
    ? Number(router.query.categoryId)
    : null;

  useEffect(() => {
    if (router.query.tab === 'end') {
      if (router.query.examId || router.query.examIds) {
        updateQuestionIndexInfo(0);
      }
      if (isLoggedIn && router.query.examId && router.query.categoryId) {
        try {
          upsertRecentlyStudiedExams({
            variables: {
              input: {
                categoryId: Number(router.query.categoryId),
                examIds: [Number(router.query.examId)],
                questionIndex: 0,
              },
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [router.query.examId, router.query.examIds, router.query.tab, isLoggedIn]);

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
        <StudyResultCard />
      </div>
      <div className="study-end-button-wrapper">
        <Button
          onClick={() => {
            delete router.query.tab;
            router.push({
              query: {
                ...router.query,
                activeIndex: 1,
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
          {Array.from({ length: questionLength }, (_, index) => index).map(
            (question, index) => (
              <SolutionModeCardItem
                key={uniqueId('question-')}
                filterStates={[QuestionState.Row, QuestionState.Middle]}
                index={index}
                hasScoreTable={false}
              />
            )
          )}
        </div>
      </div>
      {!!categoryId && (
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
