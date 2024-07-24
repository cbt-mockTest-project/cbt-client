import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import styled from 'styled-components';
import ToggleAnswerAllHiddenButton from './ToggleAnswerAllHiddenButton';
import LoopIcon from '@mui/icons-material/Loop';
import useQuestions from '@lib/hooks/useQuestions';
import SelectStudyModeModal from './SelectStudyModeModal';

const SolutionModeControlButtonsBlock = styled.div`
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  .solution-mode-control-button-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
`;

interface SolutionModeControlButtonsProps {}

const SolutionModeControlButtons: React.FC<
  SolutionModeControlButtonsProps
> = () => {
  const { shuffleQuestions } = useQuestions();
  const [isSelectStudyModeModalOpen, setIsSelectStudyModeModalOpen] =
    useState(false);
  return (
    <SolutionModeControlButtonsBlock>
      <ToggleAnswerAllHiddenButton />
      <Tooltip title="문제 순서를 섞습니다.">
        <Button onClick={shuffleQuestions}>
          <div className="solution-mode-control-button-inner">
            <ShuffleIcon />
            섞기
          </div>
        </Button>
      </Tooltip>
      <Tooltip title="학습 형태를 변경합니다.">
        <Button onClick={() => setIsSelectStudyModeModalOpen(true)}>
          <div className="solution-mode-control-button-inner">
            <LoopIcon />
            형태
          </div>
        </Button>
      </Tooltip>
      {isSelectStudyModeModalOpen && (
        <SelectStudyModeModal
          open={isSelectStudyModeModalOpen}
          onCancel={() => setIsSelectStudyModeModalOpen(false)}
        />
      )}
    </SolutionModeControlButtonsBlock>
  );
};

export default SolutionModeControlButtons;
