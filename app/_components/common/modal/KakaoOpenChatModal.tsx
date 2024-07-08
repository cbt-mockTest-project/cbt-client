import React from 'react';
import Modal, { ModalProps } from './Modal';
import KakaoOpenChatModalContent from './KakaoOpenChatModalContent';

interface KakaoOpenChatModalProps extends Omit<ModalProps, 'children'> {}

const KakaoOpenChatModal: React.FC<KakaoOpenChatModalProps> = ({
  open,
  onClose,
  className,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={className}>
      <KakaoOpenChatModalContent onClose={onClose} />
    </Modal>
  );
};

export default KakaoOpenChatModal;
