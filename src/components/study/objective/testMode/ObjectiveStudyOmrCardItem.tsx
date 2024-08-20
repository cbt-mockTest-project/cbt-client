import useQuestions from '@lib/hooks/useQuestions';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { Button } from 'antd';
import { uniqueId } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ObjectiveStudyOmrCardItemBlock = styled.div`
  height: 40px;
  display: flex;
  flex-shrink: 0;

  .objective-study-omr-card-item-index {
    width: 30px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color('colorFill')};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .objective-study-omr-card-item-question-answer-number-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

interface ObjectiveStudyOmrCardItemProps {
  index: number;
  questionId: number;
}

const ObjectiveStudyOmrCardItem: React.FC<ObjectiveStudyOmrCardItemProps> = ({
  index,
  questionId,
}) => {
  const router = useRouter();
  const currentQuestion = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );
  const { saveQuestionStateAndObjectiveAnswer } = useQuestions();
  const movePage = () => {
    if (Math.ceil(index / 2) === Number(router.query.p)) return;
    router.replace({
      query: {
        ...router.query,
        p: Math.ceil(index / 2),
      },
    });
  };
  const handleClickAnswer = (value: number) => {
    if (!currentQuestion) return;
    movePage();
    saveQuestionStateAndObjectiveAnswer(currentQuestion, value);
  };
  return (
    <ObjectiveStudyOmrCardItemBlock>
      <button
        className="objective-study-omr-card-item-index"
        onClick={movePage}
      >
        {index}
      </button>
      <div className="objective-study-omr-card-item-question-answer-number-list">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            shape="circle"
            key={`${questionId}-${uniqueId()}`}
            className="objective-study-omr-card-item-question-answer-number"
            onClick={() => handleClickAnswer(value)}
            type={
              currentQuestion.myObjectiveAnswer === value
                ? 'primary'
                : 'default'
            }
          >
            {value}
          </Button>
        ))}
      </div>
    </ObjectiveStudyOmrCardItemBlock>
  );
};

export default ObjectiveStudyOmrCardItem;
