import useObjectiveStudyHandler from '@components/study/hooks/useObjectiveStudyHandler';
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

    .objective-study-omr-card-header-title-right-wrapper {
      display: flex;
      gap: 10px;
    }
  }
`;

interface QuestionStudyOmrCardHeaderProps {
  hasToolbox?: boolean;
}

const QuestionStudyOmrCardHeader: React.FC<QuestionStudyOmrCardHeaderProps> = ({
  hasToolbox = true,
}) => {
  const { submitAnswers, resetAnswers } = useObjectiveStudyHandler();

  return (
    <QuestionStudyOmrCardHeaderBlock>
      <div className="objective-study-omr-card-header-title">
        <span>답안지</span>
        <div className="objective-study-omr-card-header-title-right-wrapper">
          {hasToolbox && (
            <>
              <Button onClick={resetAnswers}>초기화</Button>
              <Button onClick={submitAnswers}>제출</Button>
            </>
          )}
        </div>
      </div>
    </QuestionStudyOmrCardHeaderBlock>
  );
};

export default QuestionStudyOmrCardHeader;
