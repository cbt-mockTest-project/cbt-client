import { Button, Checkbox, InputNumber, Modal, ModalProps, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import palette from '@styles/palette';
import { ExamMode, ExamSettingType } from 'customTypes';
import { QuestionState } from 'types';
import { useRouter } from 'next/router';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';

const ExamSelectModalBlock = styled(Modal)`
  .exam-select-random-checkbox-wrapper,
  .exam-select-card-limit-wrapper,
  .exam-select-score-checkbox-wrapper,
  .exam-select-option-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .exam-select-label {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  .exam-select-description {
    margin-top: 5px;
    font-size: 12px;
    color: ${palette.colorTextLabel};
  }
  .exam-select-score-icon {
    font-size: 16px;
    position: relative;
    top: 3px;
  }
  .exam-start-button {
    margin-top: 20px;
    width: 100%;
  }
`;

interface ExamSelectModalProps extends Omit<ModalProps, 'children'> {
  examIds: number[];
  categoryId: number;
}

const ExamSelectModal: React.FC<ExamSelectModalProps> = (props) => {
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
    if (questionStates.length === 3) {
      setQuestionStates([]);
    } else {
      setQuestionStates([
        QuestionState.High,
        QuestionState.Row,
        QuestionState.Core,
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
    <ExamSelectModalBlock {...modalProps} title="학습 설정하기" footer={false}>
      <div>
        <div className="exam-select-option-wrapper">
          <label className="exam-select-label">
            * 학습 형태를 선택해주세요.
          </label>
          <Radio.Group
            className="exam-select-radio-group"
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
        <div className="exam-select-random-checkbox-wrapper">
          <label className="exam-select-label">* 문제 순서</label>
          <div>
            <Checkbox
              checked={isRandom}
              onClick={() => setIsRandom((prev) => !prev)}
            >
              랜덤
            </Checkbox>
          </div>
        </div>
        <div className="exam-select-score-checkbox-wrapper">
          <label className="exam-select-label">* 점수별 필터링</label>
          <div>
            <Checkbox
              checked={questionStates.length === 3}
              onClick={hadleScoreAllChange}
            >
              전체
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.High)}
              onClick={() => handleQuestionStateChange(QuestionState.High)}
            >
              <PanoramaFishEyeIcon className="exam-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.Row)}
              onClick={() => handleQuestionStateChange(QuestionState.Row)}
            >
              <ClearIcon className="exam-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={questionStates.includes(QuestionState.Core)}
              onClick={() => handleQuestionStateChange(QuestionState.Core)}
            >
              무
            </Checkbox>
          </div>
          <p className="exam-select-description">{`"무"는 점수가 체크 되지 않은 문항입니다.`}</p>
        </div>
        <div className="exam-select-card-limit-wrapper">
          <label className="exam-select-label">* 문항수</label>
          <InputNumber size="small" value={limit} onChange={setLimit} />
          <p className="exam-select-description">{`입력하지 않을 경우 전체 문항이 출제됩니다.`}</p>
        </div>
        <Button
          className="exam-start-button"
          type="primary"
          onClick={handleStart}
        >
          학습하기
        </Button>
      </div>
    </ExamSelectModalBlock>
  );
};

export default ExamSelectModal;
