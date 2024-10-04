import {
  Button,
  Checkbox,
  InputNumber,
  Modal,
  ModalProps,
  Radio,
  Select,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import { ExamMode, ExamSettingType, ObjectiveExamMode } from 'customTypes';
import { MockExam, QuestionState } from 'types';
import { useRouter } from 'next/router';
import { useEditProfileMutation, useMeQuery } from '@lib/graphql/hook/useUser';
import StudySolveLimitInfoModal from '@components/study/StudySolveLimitInfoModal';
import { checkIsEhsMasterExam, checkRole, handleError } from '@lib/utils/utils';
import useAuth from '@lib/hooks/useAuth';
import {
  getExamSettingHistory,
  setExamSettingHistory,
} from '@lib/utils/examSettingHistory';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { PUBLIC_CATEGORY_ID } from '@lib/constants/sessionStorage';
import useExamSetting from '@lib/hooks/useExamSetting';

const ObjectiveExamMultipleSelectModalBlock = styled(Modal)`
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
    color: ${({ theme }) => theme.color('colorTextSecondary')};
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

interface ObjectiveExamMultipleSelectModalProps
  extends Omit<ModalProps, 'children'> {
  categoryId: number;
  exams: MockExam[];
}

const ObjectiveExamMultipleSelectModal: React.FC<
  ObjectiveExamMultipleSelectModalProps
> = (props) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const sessionStorage = new SessionStorage();
  const examIds = useAppSelector(
    (state) => state.examSetting.examSetting.examIds
  );
  const { handleUpdateUserCache } = useAuth();
  const { data: meQuery } = useMeQuery();
  const [isRandomExamLimitModalOpen, setIsRandomExamLimitModalOpen] =
    useState(false);
  const [editProfileMutation] = useEditProfileMutation();
  const { categoryId, exams, ...modalProps } = props;
  const { handleAllExamsSelect, handleSetExamsSelect } = useExamSetting({
    categoryId,
    exams,
  });
  const router = useRouter();
  const [mode, setMode] = useState<ObjectiveExamMode>(ObjectiveExamMode.TEST);
  const [isRandom, setIsRandom] = useState<boolean>(true);
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
    try {
      if (!meQuery?.me.user) return;
      if (meQuery.me) {
        const isEhsExam = checkIsEhsMasterExam(examIds);
        const isBasicPlanUser = checkRole({ roleIds: [1, 2, 3], meQuery });
        if (
          Number(meQuery.me.user.randomExamLimit) <= 0 &&
          !isEhsExam &&
          !isBasicPlanUser
        ) {
          setIsRandomExamLimitModalOpen(true);
          return;
        }
        editProfileMutation({
          variables: {
            input: {
              randomExamLimit: Number(meQuery.me.user.randomExamLimit) - 1,
            },
          },
        });
        handleUpdateUserCache({
          randomExamLimit: Number(meQuery.me.user.randomExamLimit) - 1,
        });
      }

      const currentExamSettings: ExamSettingType = {
        categoryId,
        mode,
        isRandom,
        questionStates,
        limit,
        examIds,
      };
      setExamSettingHistory(currentExamSettings);
      let pathname = '/mcq/study';
      sessionStorage.set(PUBLIC_CATEGORY_ID, categoryId);
      router.push({
        pathname,
        query: {
          ...(categoryId ? { categoryId } : {}),
          order: isRandom ? 'random' : 'normal',
          states: questionStates.join(','),
          limit: limit ? limit.toString() : '',
          examIds: examIds.join(','),
          mode,
        },
      });
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    const examSetting = getExamSettingHistory(categoryId);
    if (!examSetting) return;
    const { mode, isRandom, questionStates, limit } = examSetting;
    if (mode) setMode(mode as ObjectiveExamMode);
    if (isRandom) setIsRandom(isRandom);
    if (questionStates) setQuestionStates(questionStates);
    if (limit) setLimit(limit);
  }, []);

  useEffect(() => {
    // 모바일 환경에서 검색 막기
    if (!selectRef.current) return;
    const inputElement = selectRef.current.querySelector('input');
    if (inputElement) {
      inputElement.setAttribute('readonly', 'true');
    }
  }, [selectRef]);

  const options = [
    {
      label: examIds.length === exams.length ? '전체 취소' : '전체 선택',
      value: 0,
    },
    ...exams.map((exam) => ({
      label: exam.title,
      value: exam.id,
    })),
  ];

  const handleSelectChange = (value: number[]) => {
    if (value.includes(0)) {
      handleAllExamsSelect();
    } else {
      handleSetExamsSelect(value);
    }
  };

  return (
    <ObjectiveExamMultipleSelectModalBlock
      {...modalProps}
      title="랜덤 모의고사"
      footer={false}
    >
      <div>
        <div className="exam-multiple-select-option-wrapper">
          <div ref={selectRef}>
            <Select
              className="mb-4"
              size="large"
              mode="tags"
              allowClear
              maxTagCount={2}
              style={{ width: '100%' }}
              placeholder="과목을 선택해주세요."
              value={examIds}
              options={options}
              onChange={handleSelectChange}
            />
          </div>
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
            <Radio.Button value={ObjectiveExamMode.TEST}>시험모드</Radio.Button>
            <Radio.Button value={ObjectiveExamMode.AUTO}>연습모드</Radio.Button>
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
          <p className="exam-multiple-select-description">{`"무"는 풀지 않은 문항입니다.`}</p>
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
          size="large"
          disabled={!examIds.length}
          onClick={handleStart}
        >
          시작하기
        </Button>
      </div>
      {isRandomExamLimitModalOpen && (
        <StudySolveLimitInfoModal
          title="모두CBT에서 효율적인 학습을 경험해보세요 😊"
          open={isRandomExamLimitModalOpen}
          onCancel={() => setIsRandomExamLimitModalOpen(false)}
        />
      )}
    </ObjectiveExamMultipleSelectModalBlock>
  );
};

export default ObjectiveExamMultipleSelectModal;
