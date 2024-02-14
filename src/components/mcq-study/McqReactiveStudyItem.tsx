import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import parse from 'html-react-parser';
import { Button } from 'antd';
import Bookmark from '@components/common/bookmark/Bookmark';
import { EditOutlined } from '@ant-design/icons';
import useHandleQuestion from '@lib/hooks/useHandleQuestion';
import palette from '@styles/palette';

const McqReactiveStudyItemBlock = styled.div`
  .mcq-reactive-study-question-header-button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    .mcq-reactive-study-question-header-edit-button-wrapper {
      cursor: pointer;
    }
  }
  .mcq-reactive-study-question-wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
    background-color: ${palette.colorBorderLight};
    padding: 10px;
    border-radius: 5px;
  }
  .mcq-reactive-study-options-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .mcq-reactive-study-option-wrapper {
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 15px 10px;
      border-radius: 5px;

      .mcq-reactive-study-option-number {
      }
    }
    .mcq-reactive-study-option-wrapper.incorrect {
      background-color: #ffe5e8;
    }
    .mcq-reactive-study-option-wrapper.correct {
      background-color: #e6f7ff;
    }
  }
  .mcq-reactive-study-solution-wrapper {
    margin-top: 30px;
  }
`;

interface McqReactiveStudyItemProps extends MockExamQuestion {
  number: number;
}

const McqReactiveStudyItem: React.FC<McqReactiveStudyItemProps> = (props) => {
  const { number, ...defaultQuestion } = props;
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);
  const { question, setQuestion, handleSaveBookmark } = useHandleQuestion({
    defaultQuestion: defaultQuestion as MockExamQuestion,
  });
  const { isInCorrect, isCorrect } = useMemo(
    () => ({
      isInCorrect: (index: number) =>
        index + 1 === selectedNumber &&
        selectedNumber !== question.objectiveData.answer,
      isCorrect: (index: number) =>
        selectedNumber && index + 1 === question.objectiveData.answer,
    }),
    [selectedNumber]
  );

  const onClickOptionButton = (index: number) => {
    if (!isSolutionVisible) setIsSolutionVisible(true);
    if (index + 1 === selectedNumber) {
      setSelectedNumber(null);
      return;
    }
    setSelectedNumber(index + 1);
  };
  return (
    <McqReactiveStudyItemBlock>
      <div className="mcq-reactive-study-question-header-button-wrapper">
        <Bookmark
          active={question.isBookmarked}
          onClick={() => handleSaveBookmark(question)}
        />
        <div className="mcq-reactive-study-question-header-edit-button-wrapper">
          <EditOutlined />
        </div>
      </div>
      <div className="mcq-reactive-study-question-wrapper">
        <div>{number}.</div>
        <div>{parse(question.question)}</div>
      </div>
      <div className="mcq-reactive-study-options-wrapper">
        {question.objectiveData.content.map((content, index) => (
          <div
            className={`mcq-reactive-study-option-wrapper ${
              isInCorrect(index)
                ? 'incorrect'
                : isCorrect(index) || isInCorrect(index)
                ? 'correct'
                : 'default'
            }`}
            key={index}
          >
            <Button
              className="mcq-reactive-study-option-number"
              onClick={() => onClickOptionButton(index)}
              type={
                isCorrect(index) || isInCorrect(index) ? 'primary' : 'default'
              }
              danger={isInCorrect(index)}
            >
              {index + 1}
            </Button>
            <div>{parse(content.content)}</div>
          </div>
        ))}
      </div>
      {isSolutionVisible && (
        <div className="mcq-reactive-study-solution-wrapper">
          <div>해설</div>
          <div>{parse(question.solution)}</div>
        </div>
      )}
    </McqReactiveStudyItemBlock>
  );
};

export default McqReactiveStudyItem;
