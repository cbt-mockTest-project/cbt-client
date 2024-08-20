import useQuestionsScore from '@lib/hooks/useQuestionsScore';
import { App, Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const QuestionStudyOmrCardHeaderBlock = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.color('colorPrimaryHover')};
  color: white;
  padding: 10px;

  .objective-study-omr-card-header-title {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

interface QuestionStudyOmrCardHeaderProps {}

const QuestionStudyOmrCardHeader: React.FC<
  QuestionStudyOmrCardHeaderProps
> = () => {
  const { modal } = App.useApp();
  const { handleResetQuestionState } = useQuestionsScore();
  const onClickReset = () => {
    modal.confirm({
      title: '초기화 하시겠습니까?',
      onOk: handleResetQuestionState,
    });
  };
  return (
    <QuestionStudyOmrCardHeaderBlock>
      <div className="objective-study-omr-card-header-title">
        <span>답안지</span>
        <Button onClick={onClickReset}>초기화</Button>
      </div>
    </QuestionStudyOmrCardHeaderBlock>
  );
};

export default QuestionStudyOmrCardHeader;
