import { useAppSelector } from '@modules/redux/store/configureStore';
import { Button, Card } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import { useRouter } from 'next/router';
import ObjectiveStudyResultQuestionCard from './ObjectiveStudyResultQuestionCard';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { LocalStorage } from '@lib/utils/localStorage';

const ObjectiveStudyResultBlock = styled.div`
  margin-bottom: auto;

  padding: 0 20px 30px 20px;

  .objective-study-result-title {
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 15px;
  }

  .objective-study-result-card {
    border-color: ${({ theme }) => theme.color('colorBorder')};

    .objective-study-result-card-row-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0 auto;
      max-width: 300px;

      .objective-study-result-card-row {
        display: flex;
        justify-content: space-between;

        .objective-study-result-card-row-title {
          font-weight: 700;
          font-size: 18px;
          color: ${({ theme }) => theme.color('colorTextSecondary')};
        }

        .objective-study-result-card-row-value {
          font-size: 18px;
          color: ${({ theme }) => theme.color('colorTextSecondary')};
          font-weight: 700;
        }

        .objective-study-result-card-row-value.success {
          color: ${({ theme }) => theme.color('colorPrimary')};
        }

        .objective-study-result-card-row-value.danger {
          color: ${({ theme }) => theme.color('colorError')};
        }
      }

      .objective-study-result-card-button-container {
        margin-top: 15px;
        display: flex;
        gap: 15px;
      }
    }
  }

  .objective-study-result-question-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

interface ObjectiveStudyResultProps {}

const ObjectiveStudyResult: React.FC<ObjectiveStudyResultProps> = () => {
  const localStorage = new LocalStorage();
  const router = useRouter();
  const totalQuestionCount = useAppSelector(
    (state) => state.mockExam.questions.length
  );
  const correctQuestionCount = useAppSelector(
    (state) =>
      state.mockExam.questions.filter(
        (question) => question.myQuestionState === QuestionState.High
      ).length
  );
  const questionIds = useAppSelector((state) =>
    state.mockExam.questions.map((question) => question.id)
  );

  const handleClickRestart = () => {
    delete router.query.step;
    router.push({
      query: {
        ...router.query,
        p: 1,
      },
    });
  };
  const handleClickEnd = () => {
    const lastVisitedCategory = localStorage.get(LAST_VISITED_CATEGORY);
    if (lastVisitedCategory) {
      router.push(lastVisitedCategory);
    } else {
      router.push('/');
    }
  };
  return (
    <ObjectiveStudyResultBlock>
      <div className="objective-study-result-title">학습 결과</div>
      <Card className="objective-study-result-card">
        <div className="objective-study-result-card-row-container">
          <div className="objective-study-result-card-row">
            <div className="objective-study-result-card-row-title">
              총 문제수
            </div>
            <div className="objective-study-result-card-row-value">
              {totalQuestionCount} 문제
            </div>
          </div>
          <div className="objective-study-result-card-row">
            <div className="objective-study-result-card-row-title">
              맞은 문제 수
            </div>
            <div className="objective-study-result-card-row-value success">
              {correctQuestionCount} 문제
            </div>
          </div>
          <div className="objective-study-result-card-row">
            <div className="objective-study-result-card-row-title">
              틀린 문제 수
            </div>
            <div className="objective-study-result-card-row-value danger">
              {totalQuestionCount - correctQuestionCount} 문제
            </div>
          </div>
          <div className="objective-study-result-card-row">
            <div className="objective-study-result-card-row-title">점수</div>
            <div className="objective-study-result-card-row-value">
              {Math.round((correctQuestionCount / totalQuestionCount) * 100)} 점
            </div>
          </div>
          <div className="objective-study-result-card-button-container">
            <Button size="large" onClick={handleClickRestart}>
              다시풀기
            </Button>
            <Button size="large" onClick={handleClickEnd} type="primary">
              종료하기
            </Button>
          </div>
        </div>
      </Card>
      <div className="objective-study-result-title">문제 다시 보기</div>
      <div className="objective-study-result-question-container">
        {questionIds.map((questionId, index) => (
          <ObjectiveStudyResultQuestionCard
            key={questionId}
            questionId={questionId}
            index={index + 1}
          />
        ))}
      </div>
    </ObjectiveStudyResultBlock>
  );
};

export default ObjectiveStudyResult;
