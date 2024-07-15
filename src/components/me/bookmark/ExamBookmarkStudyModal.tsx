import { Button, Checkbox, InputNumber, Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import StudySolveLimitInfoModal from '@components/study/StudySolveLimitInfoModal';
import { handleError } from '@lib/utils/utils';

const ExamBookmarkStudyModalBlock = styled(Modal)`
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

interface ExamBookmarkStudyModalProps extends Omit<ModalProps, 'children'> {
  selectedFolderId: number;
}

const ExamBookmarkStudyModal: React.FC<ExamBookmarkStudyModalProps> = (
  props
) => {
  const { selectedFolderId, ...modalProps } = props;
  const router = useRouter();
  const [isRandom, setIsRandom] = useState<boolean>(true);
  const [limit, setLimit] = useState<number | null>();

  const handleStart = () => {
    try {
      router.push({
        pathname: '/study',
        query: {
          folderId: selectedFolderId,
          order: isRandom ? 'random' : 'normal',
          limit: limit ? limit.toString() : '',
          bookmarked: 'true',
          mode: 'typing',
        },
      });
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <ExamBookmarkStudyModalBlock
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
    </ExamBookmarkStudyModalBlock>
  );
};
export default ExamBookmarkStudyModal;
