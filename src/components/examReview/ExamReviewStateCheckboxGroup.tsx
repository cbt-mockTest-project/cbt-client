import { Button, Checkbox, App } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ClearIcon from '@mui/icons-material/Clear';
import { QuestionState } from 'types';
import { useRouter } from 'next/router';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { isUndefined } from 'lodash';
import ExamReviewStudyModal from './ExamReviewStudyModal';

const ExamReviewStateCheckboxGroupBlock = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
  .exam-review-state-checkbox-group {
    .ant-checkbox-wrapper {
      align-items: center;
      .ant-checkbox-inner {
        width: 24px;
        height: 24px;
      }
      .ant-checkbox-inner::after {
        width: 10px;
        height: 14px;
      }
      span:last-child {
        height: 24px;
      }
    }
  }
`;

interface ExamReviewStateCheckboxGroupProps {
  setFetchQuestionsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchQuestions: (params: {
    ids: number[];
    states: QuestionState[];
  }) => Promise<void>;
  examIds: string;
}

const ExamReviewStateCheckboxGroup: React.FC<
  ExamReviewStateCheckboxGroupProps
> = ({ setFetchQuestionsLoading, fetchQuestions, examIds }) => {
  const { message } = App.useApp();
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const { data: meQuery } = useMeQuery();
  const router = useRouter();
  const [checkedStates, setCheckedStates] = useState<QuestionState[]>([
    QuestionState.Row,
  ]);

  const ScoreCheckboxOptions = [
    {
      label: <ChangeHistoryIcon />,
      value: QuestionState.Middle,
    },
    {
      label: <ClearIcon />,
      value: QuestionState.Row,
    },
  ];

  const handleStateCheck = (checkedValues: QuestionState[]) => {
    setCheckedStates(checkedValues);
    if (!meQuery?.me.ok) return;
    setFetchQuestionsLoading(true);
    fetchQuestions({
      ids: examIds.split(',').map((id) => +id),
      states: checkedValues,
    }).finally(() => setFetchQuestionsLoading(false));
  };

  useEffect(() => {
    if (!router.query.examIds) return;

    if (isUndefined(meQuery)) return;
    if (!meQuery.me.ok) {
      message.error('로그인이 필요한 서비스입니다.');
      router.back();
      return;
    }
    setFetchQuestionsLoading(true);
    fetchQuestions({
      ids: examIds.split(',').map((id) => +id),
      states: checkedStates,
    }).then(() => setFetchQuestionsLoading(false));
  }, [examIds, meQuery]);

  return (
    <ExamReviewStateCheckboxGroupBlock>
      <Checkbox.Group
        className="exam-review-state-checkbox-group"
        options={ScoreCheckboxOptions}
        value={checkedStates}
        onChange={handleStateCheck}
      />
      <Button onClick={() => setIsStudyModalOpen(true)}>풀이모드 전환</Button>
      {isStudyModalOpen && (
        <ExamReviewStudyModal
          open={isStudyModalOpen}
          onCancel={() => setIsStudyModalOpen(false)}
          questionStates={checkedStates}
        />
      )}
    </ExamReviewStateCheckboxGroupBlock>
  );
};

export default ExamReviewStateCheckboxGroup;
