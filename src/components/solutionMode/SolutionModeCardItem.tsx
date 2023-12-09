import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Image, Popover } from 'antd';
import EditorStyle from '@styles/editorStyle';
import palette from '@styles/palette';
import { QuestionState, ReadQuestionsByExamIdsOutput } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import { EditOutlined } from '@ant-design/icons';
import QuestionFeedbackModal from './QuestionFeedbackModal';
import useQuestions from '@lib/hooks/useQuestions';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';

const SolutionModeCardItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .solution-mode-question-content-wrapper {
    ${EditorStyle}
    display: flex;
    flex-direction: column;
    gap: 24px;
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

  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);

  return (
    <SolutionModeCardItemBlock>
      <BasicCard className="solution-mode-question-card">
        <div className="solution-mode-question-content-wrapper">
          <StudyQuestionBox
            saveBookmark={saveBookmark}
            questionNumber={index + 1}
            question={question}
          />
          <StudyAnswerBox isAnswerHidden={isAnswerHidden} question={question} />
        </div>
      </BasicCard>
      <StudyControlBox
        saveQuestionState={saveQuestionState}
        question={question}
        answerHiddenOption={{
          isAnswerHidden,
          setIsAnswerHidden,
        }}
      />
    </SolutionModeCardItemBlock>
  );
};

export default SolutionModeCardItem;
