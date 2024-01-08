import useQuestionScores from '@lib/hooks/useQuestionScores';
import useQuestions from '@lib/hooks/useQuestions';
import { Button, Checkbox, Empty, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import ClearIcon from '@mui/icons-material/Clear';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { handleError } from '@lib/utils/utils';
import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import HistoryLoader from './HistoryLoader';

const ScoreTabBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .score-tab-exam-title-select {
    max-width: 400px;
  }
  .score-tab-question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .score-tab-reset-button {
    width: fit-content;
  }
  .score-tab-question-state-checkbox-wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .score-tab-question-state-checkbox {
    align-items: center;

    .ant-checkbox-inner {
      height: 18px;
    }
  }
  .score-tab-question-state-checkbox-group {
    .ant-checkbox-wrapper {
      align-items: center;
      span:last-child {
        height: 18px;
        svg {
          font-size: 18px;
        }
      }
    }
  }
`;

interface ScoreTabProps {}

const ScoreTab: React.FC<ScoreTabProps> = () => {
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const {
    questions,
    saveBookmark,
    saveQuestionState,
    fetchQuestions,
    resetQuestions,
  } = useQuestions();
  const { examTitles, getExamTitlesLoading, resetQuestionScores } =
    useQuestionScores();
  const [checkedStates, setCheckedStates] = useState<QuestionState[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const handleFetchQuestions = async (states: QuestionState[]) => {
    try {
      if (!selectedExamId) return;
      setFetchQuestionsLoading(true);
      await fetchQuestions(
        {
          ids: [selectedExamId],
          states,
        },
        'no-cache'
      );
    } catch (e) {
      handleError(e);
    } finally {
      setFetchQuestionsLoading(false);
    }
  };
  const handleAllStateCheck = () => {
    if (checkedStates.length === 2) {
      setCheckedStates([]);
      handleFetchQuestions([]);
    } else {
      setCheckedStates([QuestionState.High, QuestionState.Row]);
      handleFetchQuestions([QuestionState.High, QuestionState.Row]);
    }
  };

  const handleStateCheck = (states: QuestionState[]) => {
    setCheckedStates(states);
    handleFetchQuestions(states);
  };

  return (
    <ScoreTabBlock>
      <Button
        className="score-tab-reset-button"
        type="primary"
        onClick={resetQuestionScores}
      >
        점수 초기화
      </Button>
      <Select
        className="score-tab-exam-title-select"
        options={examTitles}
        placeholder="시험을 선택해주세요"
        onChange={(value) => {
          setCheckedStates([]);
          setSelectedExamId(value);
          resetQuestions();
        }}
        loading={getExamTitlesLoading}
      />
      <div className="score-tab-question-state-checkbox-wrapper">
        <Checkbox
          className="score-tab-question-state-checkbox"
          checked={checkedStates.length === 2}
          onChange={handleAllStateCheck}
        >
          전체
        </Checkbox>
        <Checkbox.Group
          className="score-tab-question-state-checkbox-group"
          options={ScoreCheckboxOptions}
          value={checkedStates}
          onChange={handleStateCheck}
        />
      </div>
      <ul className="bookmark-tab-question-list">
        {!fetchQuestionsLoading &&
          questions.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              question={question}
              index={index}
              isAnswerAllHidden={false}
              saveBookmark={saveBookmark}
              saveQuestionState={saveQuestionState}
            />
          ))}
        {!fetchQuestionsLoading && questions.length === 0 && (
          <Empty description="문제가 없습니다." />
        )}
        {fetchQuestionsLoading && <HistoryLoader />}
      </ul>
    </ScoreTabBlock>
  );
};

export default ScoreTab;

const ScoreCheckboxOptions = [
  {
    label: <PanoramaFishEyeIcon />,
    value: QuestionState.High,
  },
  {
    label: <ClearIcon />,
    value: QuestionState.Row,
  },
];