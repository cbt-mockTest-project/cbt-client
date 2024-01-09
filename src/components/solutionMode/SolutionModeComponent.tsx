import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { MockExamQuestion } from 'types';
import SolutionModeCardItem from './SolutionModeCardItem';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';
import { SyncOutlined } from '@ant-design/icons';

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
  .solution-mode-control-button-wrapper {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    .solution-mode-control-button-inner {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .solution-mode-body {
      padding: 10px;
    }
  }
`;

interface SolutionModeComponentProps {}

const SolutionModeComponent: React.FC<SolutionModeComponentProps> = ({}) => {
  const { questions, saveBookmark, saveQuestionState, shuffleQuestions } =
    useQuestions();
  const [isAnswerAllHidden, setIsAnswerAllHidden] = useState(false);

  return (
    <SolutionModeComponentBlock>
      <div className="solution-mode-body">
        <div className="solution-mode-control-button-wrapper">
          <Button onClick={() => setIsAnswerAllHidden(!isAnswerAllHidden)}>
            {isAnswerAllHidden ? (
              <div className="solution-mode-control-button-inner">
                <VisibilityOffIcon />
                <span>정답 모두 보이기</span>
              </div>
            ) : (
              <div className="solution-mode-control-button-inner">
                <RemoveRedEyeIcon />
                <span>정답 모두 가리기</span>
              </div>
            )}
          </Button>
          <Button onClick={shuffleQuestions}>
            <div className="solution-mode-control-button-inner">
              <ShuffleIcon />
              섞기
            </div>
          </Button>
        </div>
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
