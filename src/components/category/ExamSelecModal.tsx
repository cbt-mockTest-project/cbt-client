import { Button, Modal, ModalProps, Radio } from 'antd';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import React, { useState } from 'react';
import styled from 'styled-components';

const ExamSelecModalBlock = styled(Modal)`
  .exam-select-option-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

interface ExamSelecModalProps extends Omit<ModalProps, 'children'> {
  examId: number;
  categoryId?: number;
}

const ExamSelecModal: React.FC<ExamSelecModalProps> = (props) => {
  const [mode, setMode] = useState<ExamMode>(ExamMode.SOLUTION);
  const [moveLoading, setMoveLoading] = useState<boolean>(false);
  const router = useRouter();
  const { categoryId, examId, ...modalProps } = props;
  const handleStartExam = () => {
    setMoveLoading(true);
    if (mode === ExamMode.SOLUTION)
      return router.push(`/exam/solution/${examId}`);
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
        <label className="exam-select-label">* 학습 형태를 선택해주세요.</label>
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
        </Radio.Group>
        <Button
          className="exam-select-start-button"
          size="large"
          type="primary"
          onClick={handleStartExam}
          loading={moveLoading}
        >
          학습하기
        </Button>
      </div>
    </ExamSelecModalBlock>
  );
};

export default ExamSelecModal;
