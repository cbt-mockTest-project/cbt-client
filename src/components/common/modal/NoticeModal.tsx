import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';
import KakaoOpenChatModalContent from './KakaoOpenChatModalContent';
import { Checkbox } from 'antd';
import { removeCookies, setCookie } from 'cookies-next';

interface NoticeModalProps extends Omit<ModalProps, 'children'> {}

const NoticeModal: React.FC<NoticeModalProps> = ({ open, onClose }) => {
  const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    if (checked) {
      setCookie('NOTICE_MODAL', 'true', {
        maxAge: 60 * 60 * 24 * 7,
      });
    } else {
      removeCookies('NOTICE_MODAL');
    }
  }, [checked]);
  return (
    <NoticeModalContainer open={open} onClose={onClose}>
      <h3 className="notice-modal-title">오픈채팅방 참여 안내</h3>
      <p className="notice-modal-content">
        {
          '모두CBT 오픈채팅방에 참여해보세요!\n실시간으로 모두CBT 서비스에 대한\n문의사항을 질문하고, 다른 사용자들과\n의견을 나눌 수 있습니다.'
        }
      </p>
      <KakaoOpenChatModalContent />
      <Checkbox
        className="notice-modal-checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      >
        일주일간 보지 않기
      </Checkbox>
    </NoticeModalContainer>
  );
};

export default NoticeModal;

const NoticeModalContainer = styled(Modal)`
  position: fixed;
  bottom: 0;
  top: 0;
  height: 465px;
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