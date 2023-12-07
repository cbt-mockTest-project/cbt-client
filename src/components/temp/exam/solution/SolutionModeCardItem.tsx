import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Image, Popover, message } from 'antd';
import EditorStyle from '@styles/editorStyle';
import palette from '@styles/palette';
import { QuestionState, ReadQuestionsByExamIdsOutput } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import Bookmark from '@components/common/bookmark/Bookmark';
import SolutionModeFeedbackList from './SolutionModeFeedbackList';
import { EditOutlined } from '@ant-design/icons';
import QuestionFeedbackModal from '../QuestionFeedbackModal';
import useQuestions from '@lib/hooks/useQuestions';

const SolutionModeCardItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .solution-mode-question-card {
    display: flex;
    flex-direction: row;
    gap: 10px;
    position: relative;
  }
  .solution-mode-question-content-wrapper {
    ${EditorStyle}
  }
  .solution-mode-question-card-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .solution-mode-question-card-bookmark {
    height: 24px;
  }
  .solution-mode-question-card-number {
    font-weight: bold;
    color: ${palette.subTextColor};
  }
  .solution-mode-question-card-answer-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: ${palette.subTextColor};
  }
  .solution-mode-answer-box {
    margin-top: 20px;
  }

  .solution-mode-question-card-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .solution-mode-question-card-anwswer-wrapper {
    transition: opacity 0.2s ease-in-out;
  }

  .solution-mode-question-card-anwswer-wrapper.hidden {
    opacity: 0;
  }
  .solution-mode-question-tool-box-wrapper {
    width: 60px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: flex-start;
  }
  .solution-mode-question-tool-box-button {
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
  .solution-mode-control-box {
    display: flex;
    gap: 10px;
    padding: 10px 20px;
  }
  .solution-mode-control-button {
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
  .solution-mode-control-button.active {
    border-color: ${palette.antd_blue_02};
    color: ${palette.antd_blue_02};
  }
  .solution-mode-question-card-question,
  .solution-mode-question-card-answer {
    word-break: break-all;
    white-space: pre-wrap;
  }
`;

interface SolutionModeCardItemProps {
  question: ReadQuestionsByExamIdsOutput['questions'][0];
  index: number;
  isAnswerAllHidden: boolean;
}

const SolutionModeCardItem: React.FC<SolutionModeCardItemProps> = ({
  question,
  index,
  isAnswerAllHidden,
}) => {
  const { saveBookmark, saveQuestionState } = useQuestions();
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  const [isQuestionFeedbackModalOpen, setIsQuestionFeedbackModalOpen] =
    useState(false);

  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);

  return (
    <SolutionModeCardItemBlock>
      <BasicCard className="solution-mode-question-card">
        <div className="solution-mode-question-content-wrapper">
          <div className="solution-mode-question-card-header">
            <p className="solution-mode-question-card-number">{index + 1}번</p>
            <Bookmark
              onClick={() => saveBookmark(question)}
              role="button"
              active={!!question.isBookmarked}
              className="solution-mode-question-card-bookmark"
            />
          </div>
          <div className="solution-mode-question-card-question">
            {parse(question.question || '')}
          </div>
          {question.question_img && question.question_img?.length > 0 && (
            <Image
              className="solution-mode-question-card-image"
              src={question.question_img[0].url}
              alt="문제이미지"
            />
          )}
          <div className="solution-mode-answer-box">
            <p className="solution-mode-question-card-answer-label">정답</p>
            <div
              className={`solution-mode-question-card-anwswer-wrapper ${
                isAnswerHidden ? 'hidden' : ''
              }`}
            >
              <div className="solution-mode-question-card-answer">
                {parse(question.solution || '')}
              </div>
              <SolutionModeFeedbackList question={question} />
              {question.solution_img && question.solution_img.length > 0 && (
                <Image
                  className="solution-mode-question-card-image"
                  src={question.solution_img[0].url}
                  alt="문제이미지"
                />
              )}
            </div>
          </div>
        </div>
      </BasicCard>
      <BasicCard className="solution-mode-control-box">
        <button
          className={`solution-mode-control-button ${
            question.myQuestionState === QuestionState.High ? 'active' : ''
          }`}
          onClick={() => saveQuestionState(question, QuestionState.High)}
        >
          <PanoramaFishEyeIcon />
        </button>
        <button
          className={`solution-mode-control-button ${
            question.myQuestionState === QuestionState.Row ? 'active' : ''
          }`}
          onClick={() => saveQuestionState(question, QuestionState.Row)}
        >
          <ClearIcon />
        </button>
        <button
          className="solution-mode-control-button"
          onClick={() => setIsAnswerHidden(!isAnswerHidden)}
        >
          {isAnswerHidden ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </button>
        <Popover content="답안 추가">
          <button
            className="solution-mode-control-button"
            onClick={() => setIsQuestionFeedbackModalOpen(true)}
          >
            {<EditOutlined />}
          </button>
        </Popover>
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
    </SolutionModeCardItemBlock>
  );
};

export default SolutionModeCardItem;
