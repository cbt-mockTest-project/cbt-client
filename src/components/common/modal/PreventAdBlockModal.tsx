import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';

interface PreventAdBlockModalProps extends Omit<ModalProps, 'children'> {}

const PreventAdBlockModal: React.FC<PreventAdBlockModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;
  return (
    <PreventAdBlockModalContainer open={open} onClose={onClose}>
      <h3 className="prevent-ad-block-modal-title">광고차단에 대한 안내</h3>
      <pre>
        {`모두CBT 서버는\n광고비를 통해 운영되고 있습니다.\n광고 차단프로그램을 삭제 후\n이용해주세요.`}
      </pre>
    </PreventAdBlockModalContainer>
  );
};

export default PreventAdBlockModal;

const PreventAdBlockModalContainer = styled(Modal)`
  .prevent-ad-block-modal-title {
    padding: 0 0 10px 0;
  }
  .modal-close-button {
    display: none;
  }
`;
