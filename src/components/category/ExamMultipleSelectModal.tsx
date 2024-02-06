import { Button, Checkbox, InputNumber, Modal, ModalProps, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import palette from '@styles/palette';
import { ExamMode, ExamSettingType } from 'customTypes';
import { QuestionState } from 'types';
import { useRouter } from 'next/router';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';

const ExamMultipleSelectModalBlock = styled(Modal)`
  .exam-multiple-select-random-checkbox-wrapper,
  .exam-multiple-select-card-limit-wrapper,
  .exam-multiple-select-score-checkbox-wrapper,
  .exam-multiple-select-option-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .exam-multiple-select-label {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  .exam-multiple-select-description {
    margin-top: 5px;
    font-size: 12px;
    color: ${palette.colorSubText};
  }
  .exam-multiple-select-score-icon {
    font-size: 16px;
    position: relative;
    top: 3px;
  }
  .exam-start-button {
    margin-top: 20px;
    width: 100%;
  }
`;

interface ExamMultipleSelectModalProps extends Omit<ModalProps, 'children'> {
  examIds: number[];
  categoryId: number;
}

const ExamMultipleSelectModal: React.FC<ExamMultipleSelectModalProps> = (
  props
) => {
  const { categoryId, examIds, ...modalProps } = props;
  const { getExamSettingHistory, setExamSettingHistory } =
    useExamSettingHistory();
  const router = useRouter();
  const [mode, setMode] = useState<ExamMode>(ExamMode.SOLUTION);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [limit, setLimit] = useState<number | null>(14);
  const handleQuestionStateChange = (score: QuestionState) => {
    if (questionStates.includes(score)) {
      setQuestionStates((prev) => prev.filter((s) => s !== score));
    } else {
      setQuestionStates((prev) => [...prev, score]);
    }
  };
  const hadleScoreAllChange = () => {
    if (questionStates.length === 4) {
      setQuestionStates([]);
    } else {
      setQuestionStates([
        QuestionState.High,
        QuestionState.Row,
        QuestionState.Core,
        QuestionState.Middle,
      ]);
    }
  };

  const handleStart = () => {
    const currentExamSettings: ExamSettingType = {
      categoryId,
      mode,
      isRandom,
      questionStates,
      limit,
      examIds,
    };
    setExamSettingHistory(currentExamSettings);
    router.push({
      pathname: '/study',
      query: {
        ...(categoryId ? { categoryId } : {}),
        order: isRandom ? 'random' : 'normal',
        states: questionStates.join(','),
        limit: limit ? limit.toString() : '',
        examIds: examIds.join(','),
        mode,
      },
    });
  };

  useEffect(() => {
    const examSetting = getExamSettingHistory(categoryId);
    if (!examSetting) return;
    const { mode, isRandom, questionStates, limit } = examSetting;
    if (mode) setMode(mode);
    if (isRandom) setIsRandom(isRandom);
    if (questionStates) setQuestionStates(questionStates);
    if (limit) setLimit(limit);
  }, []);
  return (
    <ExamMultipleSelectModalBlock
      {...modalProps}
      title="학습 설정하기"
      footer={false}
    >
      <div>
        <div className="exam-multiple-select-option-wrapper">
          <label className="exam-multiple-select-label">
            * 학습 형태를 선택해주세요.
          </label>
          <Radio.Group
            className="exam-multiple-select-radio-group"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
            }}
          >
            <Radio.Button value={ExamMode.SOLUTION}>해설</Radio.Button>
            <Radio.Button value={ExamMode.TYPYING}>타이핑</Radio.Button>
            <Radio.Button value={ExamMode.CARD}>카드</Radio.Button>
          </Radio.Group>
        </div>
        <div className="exam-multiple-select-random-checkbox-wrapper">
          <label className="exam-multiple-select-label">* 문제 순서</label>
          <div>
            <Checkbox
              checked={isRandom}
              onClick={() => setIsRandom((prev) => !prev)}
            >
              랜덤
            </Checkbox>
          </div>
        </div>
        <div className="exam-multiple-select-score-checkbox-wrapper">
          <label className="exam-multiple-select-label">* 점수별 필터링</label>
          <div>
            <Checkbox
              checked={questionStates.length === 4}
              onClick={hadleScoreAllChange}
            >
              전체
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.High)}
              onClick={() => handleQuestionStateChange(QuestionState.High)}
            >
              <PanoramaFishEyeIcon className="exam-multiple-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.Middle)}
              onClick={() => handleQuestionStateChange(QuestionState.Middle)}
            >
              <ChangeHistoryIcon className="exam-multiple-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.Row)}
              onClick={() => handleQuestionStateChange(QuestionState.Row)}
            >
              <ClearIcon className="exam-multiple-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.Core)}
              onClick={() => handleQuestionStateChange(QuestionState.Core)}
            >
              무
            </Checkbox>
          </div>
          <p className="exam-multiple-select-description">{`"무"는 점수가 체크 되지 않은 문항입니다.`}</p>
        </div>
        <div className="exam-multiple-select-card-limit-wrapper">
          <label className="exam-multiple-select-label">* 문항수</label>
          <InputNumber
            size="small"
            value={limit}
            onChange={(value) => setLimit(value)}
          />
          <p className="exam-multiple-select-description">{`입력하지 않을 경우 전체 문항이 출제됩니다.`}</p>
        </div>
        <Button
          className="exam-start-button"
          type="primary"
          onClick={handleStart}
        >
          학습하기
        </Button>
      </div>
    </ExamMultipleSelectModalBlock>
  );
};

export default ExamMultipleSelectModal;
