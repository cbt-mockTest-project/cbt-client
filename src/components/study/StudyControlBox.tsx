import BasicCard from '@components/common/card/BasicCard';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MockExamQuestion, QuestionState } from 'types';
import { Button, Modal, Tooltip } from 'antd';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import palette from '@styles/palette';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import StudyScoreModal from './StudyScoreModal';
import { responsive } from '@lib/utils/responsive';
import {
  AddFeedbackInput,
  EditFeedbackInput,
} from '@lib/hooks/useQuestionFeedback';
import { useRouter } from 'next/router';
import { ExamMode } from 'customTypes';
import StudySolveLimitInfoModal from './StudySolveLimitInfoModal';
import { checkIsEhsMasterExam, checkRole } from '@lib/utils/utils';
import useAuth from '@lib/hooks/useAuth';
import StudySolvedInfoModal from './StudySolvedInfoModal';
import { isMobile } from 'react-device-detect';
import useQuestions from '@lib/hooks/useQuestions';

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
    .study-control-box-score-button-wrapper {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .study-control-box-progress-button-wrapper {
      display: flex;
      gap: 5px;
    }
    .study-control-box-divider {
      margin: auto 10px;
      font-size: 30px;
      border-style: dashed;
      border-color: ${palette.colorBorder};
    }
  }
  .study-control-button {
    padding: 5px;
    margin: 0;
    border: 2px solid ${palette.colorBorder};
    color: ${palette.colorText};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    svg {
      font-size: 20px;
    }
  }
  .study-swiper-button-wrapper {
    display: none;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    gap: 10px;
  }
  .study-control-button.active {
    border-color: ${palette.antd_blue_02};
    color: ${palette.antd_blue_02};
  }
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

interface StudyControlBoxProps {
  className?: string;
  hasHelpButtonText?: boolean;
  question: MockExamQuestion;
  hasScoreTable?: boolean;
  editFeedback: (editFeedbackInput: EditFeedbackInput) => Promise<void>;
  addFeedback: (addFeedbackInput: AddFeedbackInput) => Promise<void>;
  saveQuestionState: (question: MockExamQuestion, state: QuestionState) => void;
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
  const router = useRouter();
  const { questions } = useQuestions();
  const { data: meQuery } = useMeQuery();
  const { user, handleUpdateUserCache } = useAuth();
  const mode = router.query.mode as ExamMode;
  const hasFinishButton = useMemo(
    () => [ExamMode.CARD, ExamMode.TYPYING].includes(mode),
    [mode]
  );
  const [isSolvedInfoModalOpen, setIsSolvedInfoModalOpen] = useState(false);
  const [isStudyScoreModalOpen, setIsStudyScoreModalOpen] = useState(false);
  const [isQuestionFeedbackModalOpen, setIsQuestionFeedbackModalOpen] =
    useState(false);

  const handleSaveQuestionState = (state: QuestionState) => {
    const newState =
      question.myQuestionState !== state ? state : QuestionState.Core;
    saveQuestionState(question, newState);
    if (user && !user.hasSolvedBefore) {
      setIsSolvedInfoModalOpen(true);
      handleUpdateUserCache({ hasSolvedBefore: true });
    }
  };
  return (
    <StudyControlBoxBlock className={className}>
      <BasicCard className="study-control-box" type="primary">
        <div className="study-control-box-score-button-wrapper">
          <Tooltip
            title={isMobile || !hasHelpButtonText ? '' : 'alt + shift + a'}
          >
            <button
              className={`study-control-button ${
                question.myQuestionState === QuestionState.High ? 'active' : ''
              } high`}
              onClick={() => handleSaveQuestionState(QuestionState.High)}
            >
              <PanoramaFishEyeIcon />
            </button>
          </Tooltip>
          <Tooltip
            title={isMobile || !hasHelpButtonText ? '' : 'alt + shift + s'}
          >
            <button
              className={`study-control-button ${
                question.myQuestionState === QuestionState.Middle
                  ? 'active'
                  : ''
              } middle`}
              onClick={() => handleSaveQuestionState(QuestionState.Middle)}
            >
              <ChangeHistoryIcon />
            </button>
          </Tooltip>
          <Tooltip
            title={isMobile || !hasHelpButtonText ? '' : 'alt + shift + d'}
          >
            <button
              className={`study-control-button ${
                question.myQuestionState === QuestionState.Row ? 'active' : ''
              } low`}
              onClick={() => handleSaveQuestionState(QuestionState.Row)}
            >
              <ClearIcon />
            </button>
          </Tooltip>
        </div>
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
          {hasFinishButton && (
            <Button
              className="study-control-finish-button"
              type="primary"
              onClick={() => {
                delete router.query.activeIndex;
                Modal.confirm({
                  title: '학습을 종료하시겠습니까?',
                  okText: '종료',
                  cancelText: '취소',
                  onOk: () => {
                    router.replace({
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
          questions={
            [ExamMode.CARD, ExamMode.TYPYING].includes(mode)
              ? questions
              : undefined
          }
          onClickItem={(index) => {
            if ([ExamMode.CARD, ExamMode.TYPYING].includes(mode)) {
              router.replace({
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

      {isSolvedInfoModalOpen && (
        <StudySolvedInfoModal
          open={isSolvedInfoModalOpen}
          onCancel={() => setIsSolvedInfoModalOpen(false)}
        />
      )}
    </StudyControlBoxBlock>
  );
};

export default StudyControlBox;
