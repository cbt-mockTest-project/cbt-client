import { Button, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import SquareCheckboxGroup from '@components/common/checkbox/SquareCheckboxGroup';
import { QuestionState } from 'types';
import { checkboxOption } from 'customTypes';
import ExamAchievementResult from './ExamAchievementResult';
import { circleIcon, clearIcon, triangleIcon } from '@lib/constants';

interface ExamResultComponentProps {}

const ExamResultComponent: React.FC<ExamResultComponentProps> = () => {
  const router = useRouter();
  const title = router.query.title;
  const [checkedValues, setCheckedValues] = useState<QuestionState[]>([]);
  const checkboxOptions: checkboxOption[] = [
    { value: QuestionState.High, label: circleIcon },
    { value: QuestionState.Middle, label: triangleIcon },
    { value: QuestionState.Row, label: clearIcon },
  ];
  const onCheckboxChange = (value: QuestionState[]) => {
    setCheckedValues(value);
  };
  const onClickResultView = async () => {
    if (checkedValues.length === 0) {
      return message.error('성취도를 체크해주세요');
    }
    router.push({
      pathname: '/exam/selectedresult',
      query: { ...router.query, c: JSON.stringify(checkedValues) },
    });
  };

  return (
    <ExamResultComponentContainer>
      <div className="exam-result-middle-block">
        <div className="exam-result-description-wrapper">
          <h1>{title}</h1>
          <span>문제를 모두 풀었습니다.</span>
        </div>
        <SquareCheckboxGroup
          options={checkboxOptions}
          onChange={onCheckboxChange}
        />
        <Button
          type="primary"
          className="exam-result-view-button"
          onClick={onClickResultView}
        >
          선택된 성취도 문제/해설 보기
        </Button>
      </div>
      <div className="exam-result-end-block">
        <h2>성취도 결과</h2>
        <ExamAchievementResult />
      </div>
    </ExamResultComponentContainer>
  );
};

export default ExamResultComponent;

const ExamResultComponentContainer = styled.div`
  display: flex;
  .exam-result-middle-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
  .exam-result-end-block {
    h2 {
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
  .exam-result-description-wrapper {
    text-align: center;
    span,
    h1 {
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
  .exam-result-end-block {
    flex: 1;
  }
  .exam-result-view-button {
    padding: 0 30px;
    height: 50px;
    font-size: 1rem;
  }
  .exam-result-achieve-check-box {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;
