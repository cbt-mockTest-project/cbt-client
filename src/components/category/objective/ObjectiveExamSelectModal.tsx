import Portal from '@components/common/portal/Portal';
import { PUBLIC_EXAM_ID } from '@lib/constants/sessionStorage';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { checkIsEhsMasterExam } from '@lib/utils/utils';
import { Button, Modal, ModalProps, Radio, Spin } from 'antd';
import { ExamMode, ObjectiveExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

const ObjectiveExamSelectModalBlock = styled(Modal)`
  .objective-exam-select-option-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .objective-exam-select-title {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

interface ObjectiveExamSelectModalProps extends Omit<ModalProps, 'children'> {
  examId: number;
  examTitle: string;
  categoryId?: number;
  isPublicCategory?: boolean;
}

const ObjectiveExamSelectModal: React.FC<ObjectiveExamSelectModalProps> = (
  props
) => {
  const sessionStorage = new SessionStorage();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [mode, setMode] = useState<ObjectiveExamMode>(ObjectiveExamMode.AUTO);
  const [moveLoading, setMoveLoading] = useState<boolean>(false);
  const router = useRouter();
  const { categoryId, examId, isPublicCategory, examTitle, ...modalProps } =
    props;
  const handleStartExam = () => {
    setMoveLoading(true);
    sessionStorage.set(PUBLIC_EXAM_ID, examId);
    router.push({
      pathname: '/mcq/study',
      query: {
        mode,
        examId,
        ...(categoryId ? { categoryId } : {}),
      },
    });
  };
  return (
    <ObjectiveExamSelectModalBlock {...modalProps} footer={false}>
      <div className="objective-exam-select-option-wrapper">
        <div className="objective-exam-select-title">{examTitle}</div>
        <Radio.Group
          size="large"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
        >
          <Radio.Button value={ObjectiveExamMode.AUTO}>연습모드</Radio.Button>
          <Radio.Button value={ObjectiveExamMode.TEST}>시험모드</Radio.Button>
        </Radio.Group>
        <Button
          size="large"
          type="primary"
          onClick={handleStartExam}
          loading={moveLoading}
        >
          시작하기
        </Button>
      </div>
      {isRouteLoading && (
        <Portal>
          <Spin fullscreen size="large" />
        </Portal>
      )}
    </ObjectiveExamSelectModalBlock>
  );
};

export default ObjectiveExamSelectModal;
