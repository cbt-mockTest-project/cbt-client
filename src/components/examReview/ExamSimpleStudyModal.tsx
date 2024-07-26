import { Button, Checkbox, InputNumber, Modal, ModalProps, Radio } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ExamMode } from 'customTypes';
import { QuestionState } from 'types';
import { useRouter } from 'next/router';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import StudySolveLimitInfoModal from '@components/study/StudySolveLimitInfoModal';
import { checkIsEhsMasterExam, checkRole, handleError } from '@lib/utils/utils';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { PUBLIC_CATEGORY_ID } from '@lib/constants/sessionStorage';

const ExamSimpleStudyModalBlock = styled(Modal)`
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

interface ExamSimpleStudyModalProps extends Omit<ModalProps, 'children'> {
  questionStates?: QuestionState[];
  highlighted?: boolean;
  feedbacked?: boolean;
}

const ExamSimpleStudyModal: React.FC<ExamSimpleStudyModalProps> = (props) => {
  const sessionStorage = new SessionStorage();
  const { questionStates, highlighted, feedbacked, ...modalProps } = props;
  const router = useRouter();
  const { data: meQuery } = useMeQuery();

  const categoryId = Number(router.query.categoryId);
  const examIds = String(router.query.examIds).split(',').map(Number);

  const [isRandomExamLimitModalOpen, setIsRandomExamLimitModalOpen] =
    useState(false);

  const [isRandom, setIsRandom] = useState<boolean>(true);
  const [limit, setLimit] = useState<number | null>();

  const handleStart = () => {
    try {
      if (meQuery.me) {
        const isEhsExam = checkIsEhsMasterExam(examIds);
        const isBasicPlanUser = checkRole({ roleIds: [1, 2, 3], meQuery });
        if (
          meQuery.me.user.randomExamLimit <= 0 &&
          !isEhsExam &&
          !isBasicPlanUser
        ) {
          setIsRandomExamLimitModalOpen(true);
          return;
        }
      }
      sessionStorage.set(PUBLIC_CATEGORY_ID, categoryId);
      router.push({
        pathname: '/study',
        query: {
          ...(categoryId ? { categoryId } : {}),
          ...(questionStates?.length
            ? { states: questionStates.join(',') }
            : {}),
          ...(highlighted ? { highlighted: true } : {}),
          ...(feedbacked ? { feedbacked: true } : {}),
          order: isRandom ? 'random' : 'normal',
          limit: limit ? limit.toString() : '',
          examIds: examIds.join(','),
          mode: ExamMode.TYPYING,
        },
      });
    } catch (e) {
      console.log(e);
      handleError(e);
    }
  };
  return (
    <ExamSimpleStudyModalBlock
      {...modalProps}
      title="학습 설정하기"
      footer={false}
    >
      <div>
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
    </ExamSimpleStudyModalBlock>
  );
};
export default ExamSimpleStudyModal;
