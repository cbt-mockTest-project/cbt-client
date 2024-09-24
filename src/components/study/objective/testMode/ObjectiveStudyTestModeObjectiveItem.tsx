import useQuestions from '@lib/hooks/useQuestions';
import { useAppSelector } from '@modules/redux/store/configureStore';
import EditorStyle from '@styles/editorStyle';
import { Button, Image } from 'antd';
import React from 'react';
import parse from 'html-react-parser';
import styled, { css } from 'styled-components';
import { ObjectiveStudyTestModeItemStatus } from './ObjectiveStudyTestModeItem';
import { responsive } from '@lib/utils/responsive';

const ObjectiveStudyTestModeObjectiveItemBlock = styled.div<{
  status: ObjectiveStudyTestModeItemStatus;
}>`
  .objective-study-test-mode-item-objective-content {
    ${EditorStyle}
    white-space: pre-line;
    position: relative;
    top: 3px;
  }
  .objective-study-test-mode-item-objective {
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    padding: 10px 5px;
    gap: 10px;
  }

  .objective-study-test-mode-item-objective.active {
    ${({ status }) => {
      if (status === 'default') {
        return css`
          background-color: ${({ theme }) => theme.color('colorBgTextHover')};
        `;
      }
      if (status === 'incorrect') {
        return css`
          background-color: ${({ theme }) => theme.color('colorErrorBgHover')};
        `;
      }
      if (status === 'correct') {
        return css`
          background-color: ${({ theme }) =>
            theme.color('colorPrimaryBgHover')};
        `;
      }
    }}
  }

  .objective-study-test-mode-item-objective-image {
    max-width: 730px !important;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    @media (max-width: ${responsive.medium}) {
      max-width: 100% !important;
    }
  }
`;

interface ObjectiveStudyTestModeObjectiveItemProps {
  status: ObjectiveStudyTestModeItemStatus;
  questionId: number;
  index: number;
  autoMode?: boolean;
}

const ObjectiveStudyTestModeObjectiveItem: React.FC<
  ObjectiveStudyTestModeObjectiveItemProps
> = ({ status, questionId, index, autoMode }) => {
  const { saveQuestionStateAndObjectiveAnswer, saveBookmark } = useQuestions();
  const question = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );
  const objective = question.objectiveData.content[index];
  const isUserAnswer = question.myObjectiveAnswer === index + 1;
  const isCorrectAnswer = question.objectiveData.answer === index + 1;

  const getDangerStatus = () => {
    return status === 'incorrect' && isUserAnswer;
  };

  const getButtonType = () => {
    if (status === 'default') {
      return isUserAnswer ? 'primary' : 'default';
    }
    return isCorrectAnswer || isUserAnswer ? 'primary' : 'default';
  };

  const onClickObjective = (index: number) => {
    if (status !== 'default' && !autoMode) return;
    if (question.myObjectiveAnswer === index + 1) {
      saveQuestionStateAndObjectiveAnswer(question, 0);
    } else {
      saveQuestionStateAndObjectiveAnswer(question, index + 1);
    }
  };

  return (
    <ObjectiveStudyTestModeObjectiveItemBlock status={status}>
      <div
        className={`objective-study-test-mode-item-objective ${
          question.myObjectiveAnswer === index + 1 ? 'active' : ''
        }`}
        onClick={() => {
          onClickObjective(index);
        }}
      >
        <Button
          shape="circle"
          danger={getDangerStatus()}
          type={getButtonType()}
        >
          {index + 1}
        </Button>
        <pre className="objective-study-test-mode-item-objective-content">
          {parse(objective.content)}
        </pre>
      </div>

      {objective.url && (
        <Image
          className="objective-study-test-mode-item-objective-image"
          src={objective.url}
          alt="선택지 이미지"
        />
      )}
    </ObjectiveStudyTestModeObjectiveItemBlock>
  );
};

export default ObjectiveStudyTestModeObjectiveItem;
