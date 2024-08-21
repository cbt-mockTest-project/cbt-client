import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import { uniqueId } from 'lodash';
import { Button, Image } from 'antd';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import ObjectiveStudyTestModeObjectiveItem from './ObjectiveStudyTestModeObjectiveItem';

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

  .objective-study-test-mode-item-answer-wrapper {
    padding-top: 15px;
    border-top: 1px solid ${({ theme }) => theme.color('colorBorder')};
    .objective-study-test-mode-item-answer-title {
      font-size: 16px;
      color: ${({ theme }) => theme.color('colorTextTertiary')};
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

  const contentsLength = question.objectiveData.content?.length;

  const { saveQuestionStateAndObjectiveAnswer, saveBookmark } = useQuestions();

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
        {Array.from({ length: contentsLength }).map((_, index) => (
          <ObjectiveStudyTestModeObjectiveItem
            key={index}
            status={status}
            questionId={questionId}
            index={index}
          />
        ))}
      </div>
      {readOnly && (
        <div className="objective-study-test-mode-item-answer-wrapper">
          <div className="objective-study-test-mode-item-answer-title">
            해설
          </div>
          <pre className="objective-study-test-mode-item-question">
            {parse(question.solution)}
          </pre>
          {question.solution_img && question.solution_img.length > 0 && (
            <Image
              className="objective-study-test-mode-item-question-image"
              src={question.solution_img[0].url}
              alt="문제 이미지"
            />
          )}
        </div>
      )}
    </ObjectiveStudyTestModeItemBlock>
  );
};

export default ObjectiveStudyTestModeItem;
