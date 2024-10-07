import useQuestionsScore from '@lib/hooks/useQuestionsScore';
import { responsive } from '@lib/utils/responsive';
import { handleError } from '@lib/utils/utils';
import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ObjectiveStudyOmrCard from './testMode/ObjectiveStudyOmrCard';

const ObjectiveStudyHistoryConfirmBlock = styled.div`
  padding: 20px 0 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
  .objective-study-history-confirm-text {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    white-space: pre-line;
  }

  .objective-study-history-confirm-button-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
    @media (max-width: ${responsive.medium}) {
      position: fixed;
      bottom: 0;
      width: 100%;
      border-top: 1px solid ${({ theme }) => theme.color('colorBorder')};
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.color('colorBgLayout')};
    }
  }
`;

interface ObjectiveStudyHistoryConfirmProps {
  setIsHistoryConfirmVisible: (isHistoryConfirmVisible: boolean) => void;
}

const ObjectiveStudyHistoryConfirm: React.FC<
  ObjectiveStudyHistoryConfirmProps
> = ({ setIsHistoryConfirmVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleResetQuestionState } = useQuestionsScore();
  const onClickCloseButton = () => {
    setIsHistoryConfirmVisible(false);
  };

  const onClickDeleteButton = async () => {
    try {
      setIsLoading(true);
      await handleResetQuestionState();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setIsHistoryConfirmVisible(false);
    }
  };

  return (
    <ObjectiveStudyHistoryConfirmBlock>
      <ObjectiveStudyOmrCard
        hasToolbox={false}
        title="이전 풀이기록"
        readonly
      />
      {/* <div className="objective-study-history-confirm-text">
        {`이전 풀이기록을 초기화 후\n풀이를 시작하시겠습니까?`}
      </div> */}
      <div className="objective-study-history-confirm-button-wrapper">
        <Button size="large" onClick={onClickCloseButton}>
          유지하고 시작
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={onClickDeleteButton}
          loading={isLoading}
        >
          초기화하고 시작
        </Button>
      </div>
    </ObjectiveStudyHistoryConfirmBlock>
  );
};

export default ObjectiveStudyHistoryConfirm;
