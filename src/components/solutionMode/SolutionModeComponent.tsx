import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { MockExamQuestion } from 'types';
import SolutionModeCardItem from './SolutionModeCardItem';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';

const SolutionModeComponentBlock = styled.div`
  .solution-mode-body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
  }
  .solution-mode-solution-card-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .solution-mode-all-hide-toggle-button {
    margin-bottom: 15px;
  }
  .solution-mode-all-hide-toggle-button-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
  @media (max-width: ${responsive.medium}) {
    .solution-mode-body {
      padding: 10px;
    }
  }
`;

interface SolutionModeComponentProps {}

const SolutionModeComponent: React.FC<SolutionModeComponentProps> = ({}) => {
  const { questions, saveBookmark, saveQuestionState } = useQuestions();
  const [isAnswerAllHidden, setIsAnswerAllHidden] = useState(false);

  return (
    <SolutionModeComponentBlock>
      <div className="solution-mode-body">
        <Button
          className="solution-mode-all-hide-toggle-button"
          onClick={() => setIsAnswerAllHidden(!isAnswerAllHidden)}
        >
          {isAnswerAllHidden ? (
            <div className="solution-mode-all-hide-toggle-button-inner">
              <VisibilityOffIcon />
              <span>정답 모두 보이기</span>
            </div>
          ) : (
            <div className="solution-mode-all-hide-toggle-button-inner">
              <RemoveRedEyeIcon />
              <span>정답 모두 가리기</span>
            </div>
          )}
        </Button>
        <ul className="solution-mode-solution-card-list">
          {questions!.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              saveBookmark={saveBookmark}
              saveQuestionState={saveQuestionState}
              question={question as MockExamQuestion}
              isAnswerAllHidden={isAnswerAllHidden}
              index={index}
            />
          ))}
        </ul>
      </div>
    </SolutionModeComponentBlock>
  );
};

export default SolutionModeComponent;
