import React, { useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { QuestionState } from 'types';
import { Tooltip } from 'antd';
import useAuth from '@lib/hooks/useAuth';
import StudySolvedInfoModal from './StudySolvedInfoModal';
import { isMobile } from 'react-device-detect';
import { StudyControlBoxProps } from './StudyControlBox';
const StudyControlStateButtonsBlock = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  .study-control-button {
    padding: 5px;
    margin: 0;
    border: 2px solid ${({ theme }) => theme.color('colorBorder')};
    color: ${({ theme }) => theme.color('colorText')};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    svg {
      font-size: 20px;
    }
  }
  .study-control-button.active {
    border-color: ${({ theme }) => theme.color('colorPrimary')};
    color: ${({ theme }) => theme.color('colorPrimary')};
  }
`;

interface StudyControlStateButtonsProps
  extends Pick<
    StudyControlBoxProps,
    'question' | 'hasHelpButtonText' | 'saveQuestionState'
  > {}

const StudyControlStateButtons: React.FC<StudyControlStateButtonsProps> = ({
  question,
  hasHelpButtonText = true,
  saveQuestionState,
}) => {
  const [questionState, setQuestionState] = useState(question.myQuestionState);
  const { user, handleUpdateUserCache } = useAuth();
  const [isSolvedInfoModalOpen, setIsSolvedInfoModalOpen] = useState(false);

  const handleSaveQuestionState = (state: QuestionState) => {
    setQuestionState(() => state);
    const newState =
      question.myQuestionState !== state ? state : QuestionState.Core;
    saveQuestionState?.(question, newState);
    if (user && !user.hasSolvedBefore) {
      setIsSolvedInfoModalOpen(true);
      handleUpdateUserCache({ hasSolvedBefore: true });
    }
  };
  return (
    <StudyControlStateButtonsBlock>
      <Tooltip title={isMobile || !hasHelpButtonText ? '' : 'alt + shift + a'}>
        <button
          className={`study-control-button ${
            questionState === QuestionState.High ? 'active' : ''
          } high`}
          onClick={() => handleSaveQuestionState(QuestionState.High)}
        >
          <PanoramaFishEyeIcon />
        </button>
      </Tooltip>
      <Tooltip title={isMobile || !hasHelpButtonText ? '' : 'alt + shift + s'}>
        <button
          className={`study-control-button ${
            questionState === QuestionState.Middle ? 'active' : ''
          } middle`}
          onClick={() => handleSaveQuestionState(QuestionState.Middle)}
        >
          <ChangeHistoryIcon />
        </button>
      </Tooltip>
      <Tooltip title={isMobile || !hasHelpButtonText ? '' : 'alt + shift + d'}>
        <button
          className={`study-control-button ${
            questionState === QuestionState.Row ? 'active' : ''
          } low`}
          onClick={() => handleSaveQuestionState(QuestionState.Row)}
        >
          <ClearIcon />
        </button>
      </Tooltip>
      {isSolvedInfoModalOpen && (
        <StudySolvedInfoModal
          open={isSolvedInfoModalOpen}
          onCancel={() => setIsSolvedInfoModalOpen(false)}
        />
      )}
    </StudyControlStateButtonsBlock>
  );
};

export default StudyControlStateButtons;
