import BasicCard from '@components/common/card/BasicCard';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MockExamQuestion, QuestionState } from 'types';
import { App, Button, Tooltip } from 'antd';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import palette from '@styles/palette';
import StudyScoreModal from './StudyScoreModal';
import { responsive } from '@lib/utils/responsive';
import {
  AddFeedbackInput,
  EditFeedbackInput,
} from '@lib/hooks/useQuestionFeedback';
import { useRouter } from 'next/router';
import { ExamMode } from 'customTypes';
import useAuth from '@lib/hooks/useAuth';
import StudySolvedInfoModal from './StudySolvedInfoModal';
import { isMobile } from 'react-device-detect';
import StudyControlStateButtons from './StudyControlStateButtons';

const StudyControlBoxBlock = styled.div`
  .study-question-tool-box-wrapper {
    width: 60px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: flex-start;
  }
  .study-question-tool-box-button {
    border-radius: 50%;
    padding: 5px;
    margin: 0;
    transition: background-color 0.2s ease-in-out;
    svg {
      font-size: 20px;
    }
    &:hover {
      background-color: ${palette.gray_200};
    }
  }
  .study-control-box {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    /* .study-control-box-score-button-wrapper {
      display: flex;
      gap: 5px;
      align-items: center;
    } */
    .study-control-box-progress-button-wrapper {
      display: flex;
      gap: 5px;
    }
    .study-control-box-divider {
      margin: auto 10px;
      font-size: 30px;
      border-style: dashed;
      border-color: ${({ theme }) => theme.color('colorBorder')};
    }
  }
  /* .study-control-button {
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
  } */
  .study-swiper-button-wrapper {
    display: none;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    gap: 10px;
  }
  /* .study-control-button.active {
    border-color: ${({ theme }) => theme.color('colorPrimary')};
    color: ${({ theme }) => theme.color('colorPrimary')};
  } */
  .study-question-card-answer {
    word-break: break-all;
    white-space: pre-wrap;
  }
  .study-control-finish-button {
    margin-left: auto;
  }
  @media (max-width: ${responsive.large}) {
    .study-control-answer-toggle-button {
      display: none;
    }
    .study-swiper-button-wrapper {
      display: none;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .study-swiper-button-wrapper {
      display: none;
    }
  }
`;

export interface StudyControlBoxProps {
  className?: string;
  hasHelpButtonText?: boolean;
  question: MockExamQuestion;
  hasScoreTable?: boolean;
  editFeedback: (editFeedbackInput: EditFeedbackInput) => Promise<void>;
  addFeedback: (addFeedbackInput: AddFeedbackInput) => Promise<void>;
  saveQuestionState?: (
    question: MockExamQuestion,
    state: QuestionState,
    updateCacheDelay?: number
  ) => void;
  onChangeQuestionState?: (state: QuestionState) => void;
  answerToggleOption?: {
    isAnswerHidden: boolean;
    setIsAnswerHidden: React.Dispatch<React.SetStateAction<boolean>>;
  };
  answerHiddenOption?: {
    isAnswerHidden: boolean;
    setIsAnswerHidden: React.Dispatch<React.SetStateAction<boolean>>;
  };
  additionalControlButton?: React.ReactNode;
}

const StudyControlBox: React.FC<StudyControlBoxProps> = ({
  className = '',
  question,
  hasHelpButtonText = true,
  saveQuestionState,
  answerHiddenOption,
  answerToggleOption,
  editFeedback,
  addFeedback,
  additionalControlButton,
  hasScoreTable = true,
}) => {
  const { modal } = App.useApp();
  const router = useRouter();
  const isEndTab = router.query.tab === 'end';
  const mode = router.query.mode as ExamMode;
  const hasFinishButton = useMemo(
    () => [ExamMode.CARD, ExamMode.TYPYING].includes(mode),
    [mode]
  );
  const [isStudyScoreModalOpen, setIsStudyScoreModalOpen] = useState(false);
  const [isQuestionFeedbackModalOpen, setIsQuestionFeedbackModalOpen] =
    useState(false);

  if (!question) return null;
  return (
    <StudyControlBoxBlock className={className}>
      <BasicCard className="study-control-box" type="primary">
        <StudyControlStateButtons
          key={question.myQuestionState}
          question={question}
          saveQuestionState={saveQuestionState}
          hasHelpButtonText={hasHelpButtonText}
        />
        {answerToggleOption && (
          <Tooltip title="shift + spacebar">
            <Button
              className="study-control-answer-toggle-button"
              onClick={() =>
                answerToggleOption.setIsAnswerHidden((prev) => !prev)
              }
            >
              {answerToggleOption.isAnswerHidden ? '정답보기' : '문제보기'}
            </Button>
          </Tooltip>
        )}
        <div className="study-control-box-progress-button-wrapper">
          {answerHiddenOption && (
            <button
              className="study-control-button"
              onClick={() =>
                answerHiddenOption.setIsAnswerHidden(
                  !answerHiddenOption.isAnswerHidden
                )
              }
            >
              {answerHiddenOption.isAnswerHidden ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </button>
          )}
          {additionalControlButton && additionalControlButton}
          {hasScoreTable && (
            <Button onClick={() => setIsStudyScoreModalOpen(true)}>
              이동 & 점수
            </Button>
          )}
          {hasFinishButton && !isEndTab && (
            <Button
              className="study-control-finish-button"
              type="primary"
              onClick={() => {
                delete router.query.activeIndex;
                modal.confirm({
                  title: '학습을 종료하시겠습니까?',
                  okText: '종료',
                  cancelText: '취소',
                  onOk: () => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, tab: 'end' },
                    });
                  },
                });
              }}
            >
              종료
            </Button>
          )}
        </div>
      </BasicCard>

      {isQuestionFeedbackModalOpen && (
        <QuestionFeedbackModal
          addFeedback={addFeedback}
          editFeedback={editFeedback}
          question={question}
          open={isQuestionFeedbackModalOpen}
          onCancel={() => setIsQuestionFeedbackModalOpen(false)}
          onClose={() => setIsQuestionFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
        />
      )}
      {isStudyScoreModalOpen && hasScoreTable && (
        <StudyScoreModal
          onClickItem={(index) => {
            if ([ExamMode.CARD, ExamMode.TYPYING].includes(mode)) {
              router.push({
                query: {
                  ...router.query,
                  activeIndex: index + 1,
                },
              });
            } else {
              const a = document.getElementById(`question-${index}`);
              if (a) {
                window.scrollTo({
                  top: a.getBoundingClientRect().top + window.scrollY - 60,
                  behavior: 'smooth',
                });
              }
            }
          }}
          open={isStudyScoreModalOpen}
          onCancel={() => setIsStudyScoreModalOpen(false)}
        />
      )}
    </StudyControlBoxBlock>
  );
};

export default StudyControlBox;
