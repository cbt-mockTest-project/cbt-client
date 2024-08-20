import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import { uniqueId } from 'lodash';
import { Button, Image } from 'antd';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';

const ObjectiveStudyTestModeItemBlock = styled.div<{
  status: ObjectiveStudyTestModeItemStatus;
}>`
  padding: 0px 20px;

  font-size: 16px;
  .objective-study-test-mode-item-question-title-wrapper {
    .objective-study-test-mode-item-question-title {
      font-size: 14px;
      color: ${({ theme }) => theme.color('colorTextTertiary')};
    }
  }

  .objective-study-test-mode-item-question,
  .objective-study-test-mode-item-objective-content {
    ${EditorStyle}
    white-space: pre-line;
  }

  .objective-study-test-mode-item-question-image {
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

  .objective-study-test-mode-item-objective-content {
    position: relative;
    top: 3px;
  }

  .objective-study-test-mode-item-objective-list {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
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
            background-color: ${({ theme }) =>
              theme.color('colorErrorBgHover')};
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
  }
`;

export type ObjectiveStudyTestModeItemStatus =
  | 'correct'
  | 'incorrect'
  | 'default';

interface ObjectiveStudyTestModeItemProps {
  questionId: number;
  index: number;
  readOnly?: boolean;
}

const ObjectiveStudyTestModeItem: React.FC<ObjectiveStudyTestModeItemProps> = ({
  questionId,
  index,
  readOnly = false,
}) => {
  const question = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );

  const { saveQuestionStateAndObjectiveAnswer } = useQuestions();

  const status = readOnly
    ? question.myObjectiveAnswer === question.objectiveData.answer
      ? 'correct'
      : 'incorrect'
    : 'default';

  const onClickObjective = (index: number) => {
    if (readOnly) return;
    saveQuestionStateAndObjectiveAnswer(question, index + 1);
  };

  if (!question) return null;
  return (
    <ObjectiveStudyTestModeItemBlock status={status}>
      <div className="objective-study-test-mode-item-question-title-wrapper">
        <span>{index}. </span>
        <span className="objective-study-test-mode-item-question-title">
          {question.mockExam.title}
        </span>
      </div>
      <pre className="objective-study-test-mode-item-question">
        {parse(question.question)}
      </pre>
      {question.question_img && question.question_img.length > 0 && (
        <Image
          className="objective-study-test-mode-item-question-image"
          src={question.question_img[0].url}
          alt="문제 이미지"
        />
      )}
      <div className="objective-study-test-mode-item-objective-list">
        {question.objectiveData.content?.map((objective, index) => {
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

          return (
            <div
              key={`${question.id}-${uniqueId()}`}
              className="objective-study-test-mode-item-objective-wrapper"
            >
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
            </div>
          );
        })}
      </div>
    </ObjectiveStudyTestModeItemBlock>
  );
};

export default ObjectiveStudyTestModeItem;
