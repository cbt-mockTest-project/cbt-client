import { useCreateFeedback } from '@lib/graphql/hook/useFeedBack';
import { Button, Input, Modal, ModalProps, message } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import React from 'react';
import styled from 'styled-components';

const BugReportModalBlock = styled(Modal)`
  .bug-report-modal-inner {
    display: flex;
    flex-direction: column;
    gap: 15px;
    .bug-report-modal-title {
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

interface BugReportModalProps extends Omit<ModalProps, 'children'> {}

const BugReportModal: React.FC<BugReportModalProps> = (props) => {
  const { ...modalProps } = props;
  const textAreaRef = React.useRef<TextAreaRef>(null);
  const [createFeedback] = useCreateFeedback();
  const handleOk = async () => {
    const text = textAreaRef.current?.resizableTextArea.textArea.value;
    if (!text) {
      message.error('내용을 입력해주세요.');
      return;
    }
    try {
      await createFeedback({
        variables: {
          input: {
            content: text,
          },
        },
      });
      message.success('성공적으로 보냈습니다.');
    } catch (error) {
      message.error('오류가 발생했습니다.');
    }
  };
  return (
    <BugReportModalBlock {...modalProps} onOk={handleOk}>
      <div className="bug-report-modal-inner">
        <div className="bug-report-modal-title">🚨 버그신고</div>
        <Input.TextArea
          ref={textAreaRef}
          placeholder="내용을 입력해주세요."
          rows={4}
        />
      </div>
    </BugReportModalBlock>
  );
};

export default BugReportModal;
