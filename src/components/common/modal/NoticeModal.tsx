import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';
import KakaoOpenChatModalContent from './KakaoOpenChatModalContent';

interface NoticeModalProps extends Omit<ModalProps, 'children'> {}

const NoticeModal: React.FC<NoticeModalProps> = ({ open, onClose }) => {
  return (
    <NoticeModalContainer open={open} onClose={onClose}>
      <h3 className="notice-modal-title">오픈채팅방 참여 안내</h3>
      <p className="notice-modal-content">
        {
          '실시간으로 모두CBT 서비스에 대한\n문의사항을 질문하고, 다른 사용자들과\n의견을 나눌 수 있습니다.\n\n오픈채팅방에는\n학습을 도와주는 AI봇이 있습니다.'
        }
      </p>
      <KakaoOpenChatModalContent onClose={onClose} />
    </NoticeModalContainer>
  );
};

export default NoticeModal;

const NoticeModalContainer = styled(Modal)`
  position: fixed;
  bottom: 0;
  top: 0;
  height: 490px;
  overflow-y: auto;
  .notice-modal-content {
    font-size: 0.9rem;
    white-space: pre-line;
    margin-top: 10px;
  }
  .notice-modal-checkbox {
    margin-top: 10px;
  }
`;
