import { useEditExam } from '@lib/graphql/hook/useExam';
import { handleError } from '@lib/utils/utils';
import { Button, Modal, ModalProps, Switch, message } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ExamSettingModalBlock = styled(Modal)`
  .exam-setting-modal-inner {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    .exam-setting-approve-switch-wrapper {
      display: flex;
      gap: 10px;
    }
  }
`;

interface ExamSettingModalProps extends Omit<ModalProps, 'children'> {
  examId: number;
  isApproved: boolean;
  setIsApproved: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteExam: (id: number) => Promise<void>;
}

const ExamSettingModal: React.FC<ExamSettingModalProps> = (props) => {
  const { setIsApproved, isApproved, examId, handleDeleteExam, ...modalProps } =
    props;
  const [editExam, { loading: editExamLoading }] = useEditExam();
  const handleOnChangeApproveState = async (approved: boolean) => {
    try {
      await editExam({
        variables: {
          input: {
            approved,
            id: examId,
          },
        },
      });
      setIsApproved(approved);
    } catch (e) {
      handleError(e);
      message.error('검색허용 상태 변경에 실패했습니다.');
    }
  };
  return (
    <ExamSettingModalBlock {...modalProps} footer={false}>
      <div className="exam-setting-modal-inner">
        <div className="exam-setting-approve-switch-wrapper">
          <div>검색허용</div>
          <Switch
            checked={isApproved}
            loading={editExamLoading}
            onChange={() => handleOnChangeApproveState(!isApproved)}
          />
        </div>
        <Button onClick={() => handleDeleteExam(examId)} type="dashed">
          삭제하기
        </Button>
      </div>
    </ExamSettingModalBlock>
  );
};

export default ExamSettingModal;
