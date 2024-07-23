import { useCreateFeedback } from '@lib/graphql/hook/useFeedBack';
import { App, Input, InputRef, Modal, ModalProps } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const CategoryReportModalBlock = styled(Modal)`
  .bug-report-modal-inner {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .bug-report-modal-title {
      font-size: 14px;
      font-weight: bold;
    }
    .bug-report-modal-sub-title {
      color: ${({ theme }) => theme.color('colorTextSecondary')};
    }
  }
`;

interface CategoryReportModalProps extends Omit<ModalProps, 'children'> {}

const CategoryReportModal: React.FC<CategoryReportModalProps> = (props) => {
  const router = useRouter();
  const name = router.query.name;
  const { message, modal } = App.useApp();
  const { ...modalProps } = props;
  const textAreaRef = React.useRef<TextAreaRef>(null);
  const contactRef = React.useRef<InputRef>(null);
  const [createFeedback] = useCreateFeedback();
  const onClickOk = () => {
    modal.confirm({
      title: '암기장 신고',
      content:
        '신고를 접수하시겠습니까?\n허위 신고 및 신고 내용이 부적절한 경우 답변되지 않을 수 있습니다.',
      onOk: handleOk,
    });
  };
  const handleOk = async () => {
    const content = textAreaRef.current?.resizableTextArea?.textArea.value;
    const contact = contactRef.current?.input.value;
    if (!content || !contact) {
      message.error('내용과 연락처를 입력해주세요.');
      return;
    }
    const totalMessage = `
암기장: ${name}
연락처: ${contact}
신고 내용: ${content}
    `;
    if (!content) {
      message.error('내용을 입력해주세요.');
      return;
    }
    try {
      await createFeedback({
        variables: {
          input: {
            content: totalMessage,
          },
        },
      });
      message.success('성공적으로 보냈습니다.');
    } catch (error) {
      message.error('오류가 발생했습니다.');
    }
  };
  return (
    <CategoryReportModalBlock {...modalProps} onOk={onClickOk}>
      <div className="bug-report-modal-inner">
        <div className="bug-report-modal-title">암기장 신고</div>
        <div className="bug-report-modal-sub-title">암기장 이름: {name}</div>
        <Input ref={contactRef} placeholder="답변 받을 연락처 또는 이메일" />
        <Input.TextArea
          ref={textAreaRef}
          placeholder="신고 내용을 입력해주세요."
          rows={4}
        />
        <div>
          <div>빠른 문의</div>
          <a href="https://open.kakao.com/o/sZy6kxbf">
            https://open.kakao.com/o/sZy6kxbf
          </a>
        </div>
      </div>
    </CategoryReportModalBlock>
  );
};

export default CategoryReportModal;
