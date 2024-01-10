import { Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const InquiryModalBlock = styled(Modal)`
  .inquiry-modal-inner {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .inquiry-modal-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
`;

interface InquiryModalProps extends Omit<ModalProps, 'children'> {}

const InquiryModal: React.FC<InquiryModalProps> = (props) => {
  const { ...modalProps } = props;
  return (
    <InquiryModalBlock {...modalProps} footer={false}>
      <div className="inquiry-modal-inner">
        <div className="inquiry-modal-title">문의</div>
        <div>
          <div>이메일</div>
          <a href="mailto:moducbt@gmail.com">moducbt@gmail.com</a>
        </div>
        <div>
          <div>카카오톡</div>
          <a
            href="https://open.kakao.com/o/sZy6kxbf"
            target="_blank"
            rel="noreferrer"
          >
            https://open.kakao.com/o/sZy6kxbf
          </a>
        </div>
      </div>
    </InquiryModalBlock>
  );
};

export default InquiryModal;
