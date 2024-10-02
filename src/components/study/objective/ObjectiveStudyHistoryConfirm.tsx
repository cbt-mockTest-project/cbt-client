import useQuestionsScore from '@lib/hooks/useQuestionsScore';
import { handleError } from '@lib/utils/utils';
import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const ObjectiveStudyHistoryConfirmBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
  .objective-study-history-confirm-text {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    white-space: pre-line;
  }

  .objective-study-history-confirm-button-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
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
      <div className="objective-study-history-confirm-text">
        {`이전 풀이기록이 남아있습니다.\n 기록을 삭제하시겠습니까?`}
      </div>
      <div className="objective-study-history-confirm-button-wrapper">
        <Button size="large" onClick={onClickCloseButton}>
          유지하기
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={onClickDeleteButton}
          loading={isLoading}
        >
          삭제하기
        </Button>
      </div>
    </ObjectiveStudyHistoryConfirmBlock>
  );
};

export default ObjectiveStudyHistoryConfirm;
