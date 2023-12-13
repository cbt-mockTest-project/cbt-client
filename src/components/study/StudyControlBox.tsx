import BasicCard from '@components/common/card/BasicCard';
import React, { useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MockExamQuestion, QuestionState } from 'types';
import { EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import palette from '@styles/palette';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import useAuthModal from '@lib/hooks/useAuthModal';
import StudyScoreModal from './StudyScoreModal';
import SwiperCore from 'swiper';
import { responsive } from '@lib/utils/responsive';
import { useRouter } from 'next/router';

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
    gap: 10px;
    padding: 10px 20px;
  }
  .study-control-button {
    padding: 5px;
    margin: 0;
    border: 2px solid ${palette.borderColor};
    color: ${palette.textColor};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${palette.antd_blue_02};
    }
    svg {
      font-size: 20px;
    }
  }
  .study-swiper-button-wrapper {
    display: flex;
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
  @media (max-width: ${responsive.medium}) {
    .study-swiper-button-wrapper {
      display: none;
    }
  }
`;

interface StudyControlBoxProps {
  className?: string;
  question: MockExamQuestion;
  saveQuestionState: (question: MockExamQuestion, state: QuestionState) => void;
  answerHiddenOption?: {
    isAnswerHidden: boolean;
    setIsAnswerHidden: React.Dispatch<React.SetStateAction<boolean>>;
  };
  additionalControlButton?: React.ReactNode;
  swiper?: SwiperCore;
}

const StudyControlBox: React.FC<StudyControlBoxProps> = ({
  className = '',
  question,
  saveQuestionState,
  answerHiddenOption,
  swiper,
  additionalControlButton,
}) => {
  const router = useRouter();
  const { data } = useMeQuery();
  const { openAuthModal } = useAuthModal();
  const [isStudyScoreModalOpen, setIsStudyScoreModalOpen] = useState(false);
  const [isQuestionFeedbackModalOpen, setIsQuestionFeedbackModalOpen] =
    useState(false);
  const handleOpenFeedbackModal = () => {
    if (!data?.me.ok) {
      openAuthModal();
      return;
    }
    setIsQuestionFeedbackModalOpen(true);
  };
  const handleSaveQuestionState = (state: QuestionState) => {
    const newState =
      question.myQuestionState !== state ? state : QuestionState.Core;
    saveQuestionState(question, newState);
  };
  return (
    <StudyControlBoxBlock className={className}>
      <BasicCard className="study-control-box">
        <button
          className={`study-control-button ${
            question.myQuestionState === QuestionState.High ? 'active' : ''
          }`}
          onClick={() => handleSaveQuestionState(QuestionState.High)}
        >
          <PanoramaFishEyeIcon />
        </button>
        <button
          className={`study-control-button ${
            question.myQuestionState === QuestionState.Row ? 'active' : ''
          }`}
          onClick={() => handleSaveQuestionState(QuestionState.Row)}
        >
          <ClearIcon />
        </button>
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
        <Popover content="답안 추가">
          <button
            className="study-control-button"
            onClick={handleOpenFeedbackModal}
          >
            {<EditOutlined />}
          </button>
        </Popover>
        {additionalControlButton && additionalControlButton}
        <Button onClick={() => setIsStudyScoreModalOpen(true)}>점수표</Button>
        {swiper && (
          <div className="study-swiper-button-wrapper">
            <button
              className="study-control-button"
              onClick={() => {
                swiper.slidePrev();
              }}
            >
              <LeftOutlined />
            </button>
            <button
              className="study-control-button"
              onClick={() => {
                swiper.slideNext();
              }}
            >
              <RightOutlined />
            </button>
          </div>
        )}
      </BasicCard>

      {isQuestionFeedbackModalOpen && (
        <QuestionFeedbackModal
          question={question}
          open={isQuestionFeedbackModalOpen}
          onCancel={() => setIsQuestionFeedbackModalOpen(false)}
          onClose={() => setIsQuestionFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
        />
      )}
      {isStudyScoreModalOpen && (
        <StudyScoreModal
          onClickItem={(index) => {
            if (swiper) {
              swiper.slideTo(index, 0);
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