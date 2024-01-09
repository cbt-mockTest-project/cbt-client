import { Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import KakaoOpenChatModalContent from '../modal/KakaoOpenChatModalContent';
import palette from '@styles/palette';

const OpenChatModalBlock = styled(Modal)`
  .open-chat-modal-title {
    font-weight: bold;
  }
  .open-chat-modal-desc {
    font-size: 13px;
    color: ${palette.colorSubText};
  }
`;

interface OpenChatModalProps extends Omit<ModalProps, 'children'> {}

const OpenChatModal: React.FC<OpenChatModalProps> = (props) => {
  const { ...modalProps } = props;
  return (
    <OpenChatModalBlock {...modalProps} footer={false}>
      <div className="open-chat-modal-title">오픈채팅방 리스트</div>
      <div className="open-chat-modal-desc">
        실시간으로 모두CBT 서비스에 대한 문의사항을 질문하고, 다른 사용자들과
        의견을 나눌 수 있습니다.
      </div>
      <KakaoOpenChatModalContent />
    </OpenChatModalBlock>
  );
};

export default OpenChatModal;
