import useQuestions from '@lib/hooks/useQuestions';
import { Button, Modal } from 'antd';
import { ModalProps } from 'antd/lib';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { STUDY_STATE_ICON } from './study';
import { MockExamQuestion, QuestionState } from 'types';
import palette from '@styles/palette';
import SwiperCore from 'swiper';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useQuestionsScore from '@lib/hooks/useQuestionsScore';

const StudyScoreModalBlock = styled(Modal)`
  .study-score-item-list {
    min-height: 350px;
    height: 50vh;
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-flow: column wrap;
    overflow-y: auto;
  }
  .study-score-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    width: 150px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${palette.colorBorderLight};
    }
    svg {
      position: relative;
      font-size: 20px;
    }
  }
  .study-score-item.high {
    svg {
      color: ${palette.antd_blue_02};
    }
  }
  .study-score-item.low {
    svg {
      color: ${palette.red_500};
    }
  }
  .study-score-item.middle {
    svg {
      color: ${palette.yellow_500};
    }
  }
  .study-score-header {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
  }
`;

interface StudyScoreModalProps extends Omit<ModalProps, 'children'> {
  questions?: MockExamQuestion[];
  onClickItem?: (index: number) => void;
}

const StudyScoreModal: React.FC<StudyScoreModalProps> = (props) => {
  const { questions, onClickItem, ...modalProps } = props;
  const { questionsForScore, handleResetQuestionState } = useQuestionsScore();
  const handleResetScore = async () => {
    Modal.confirm({
      title: '점수 초기화',
      content: '점수를 초기화 하시겠습니까?',
      onOk: handleResetQuestionState,
    });
  };
  return (
    <StudyScoreModalBlock {...modalProps} footer={false}>
      <div className="study-score-header">
        <p>점수표</p>
        <Button onClick={handleResetScore}>점수 초기화</Button>
      </div>
      <div className="study-score-item-list">
        {(questions || questionsForScore).map((question, index) => (
          <div
            key={question.id}
            onClick={() => {
              if (!onClickItem) return;
              onClickItem(index);
            }}
            className={`study-score-item ${
              question.myQuestionState === QuestionState.High
                ? 'high'
                : question.myQuestionState === QuestionState.Middle
                ? 'middle'
                : 'low'
            }`}
            role="button"
          >
            <div>{index + 1}.</div>
            {question.myQuestionState
              ? STUDY_STATE_ICON[question.myQuestionState]
              : ''}
          </div>
        ))}
      </div>
    </StudyScoreModalBlock>
  );
};

export default StudyScoreModal;
