import { PUBLIC_EXAM_ID } from '@lib/constants/sessionStorage';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { checkIsEhsMasterExam } from '@lib/utils/utils';
import { Button, Modal, ModalProps, Radio } from 'antd';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

const ExamSelecModalBlock = styled(Modal)`
  .exam-select-title {
    font-size: 16px;
    font-weight: 600;
  }
  .exam-select-option-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

interface ExamSelecModalProps extends Omit<ModalProps, 'children'> {
  examId: number;
  examTitle: string;
  categoryId?: number;
  isPublicCategory?: boolean;
}

const ExamSelecModal: React.FC<ExamSelecModalProps> = (props) => {
  const sessionStorage = new SessionStorage();
  const [mode, setMode] = useState<ExamMode>(ExamMode.SOLUTION);
  const [moveLoading, setMoveLoading] = useState<boolean>(false);
  const router = useRouter();
  const { categoryId, examId, isPublicCategory, examTitle, ...modalProps } =
    props;
  const handleStartExam = () => {
    setMoveLoading(true);
    sessionStorage.set(PUBLIC_EXAM_ID, examId);
    if (mode === ExamMode.PRINT) return router.push(`/exam/pdf/${examId}`);
    if (mode === ExamMode.SOLUTION) {
      return router.push(`/exam/solution/${examId}?cid=${categoryId}`);
    }
    router.push({
      pathname: '/study',
      query: {
        mode,
        examId,
        ...(categoryId ? { categoryId } : {}),
      },
    });
  };
  return (
    <ExamSelecModalBlock {...modalProps} footer={false}>
      <div className="exam-select-option-wrapper">
        <div className="exam-select-title">{examTitle}</div>
        <Radio.Group
          className="exam-select-radio-group"
          size="large"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
        >
          <Radio.Button value={ExamMode.SOLUTION}>해설모드</Radio.Button>
          <Radio.Button value={ExamMode.TYPYING}>풀이모드</Radio.Button>
          {!checkIsEhsMasterExam([examId]) && (
            <Radio.Button value={ExamMode.PRINT}>출력모드</Radio.Button>
          )}
        </Radio.Group>
        <Button
          className="exam-select-start-button"
          size="large"
          type="primary"
          onClick={handleStartExam}
          loading={moveLoading}
        >
          시작하기
        </Button>
      </div>
    </ExamSelecModalBlock>
  );
};

export default ExamSelecModal;
