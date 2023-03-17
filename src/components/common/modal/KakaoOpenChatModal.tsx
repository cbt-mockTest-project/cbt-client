import React from 'react';
import Modal, { ModalProps } from './Modal';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ComputerIcon from '@mui/icons-material/Computer';
import ConstructionIcon from '@mui/icons-material/Construction';
import styled from 'styled-components';
import palette from '@styles/palette';

interface KakaoOpenChatModalProps extends Omit<ModalProps, 'children'> {}

const KakaoOpenChatModal: React.FC<KakaoOpenChatModalProps> = ({
  open,
  onClose,
  className,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={className}>
      <KakaoOpenChatModalContainer>
        <a
          href="https://open.kakao.com/o/ggXmZ4Xe"
          target="_blank"
          rel="noreferrer"
          className="kakao-open-chat-modal-safe-room-link"
        >
          <div className="kakao-open-chat-modal-safe-room-link-box">
            <EngineeringIcon />
            <span>산업안전기사 실기방</span>
          </div>
        </a>
        <a
          href="https://open.kakao.com/o/gySbPhaf"
          target="_blank"
          rel="noreferrer"
          className="kakao-open-chat-modal-safe-room-link"
        >
          <div className="kakao-open-chat-modal-safe-room-link-box">
            <ConstructionIcon />
            <span>건설안전기사 실기방</span>
          </div>
        </a>
        <a
          href="https://open.kakao.com/o/gjk524Xe"
          target="_blank"
          rel="noreferrer"
          className="kakao-open-chat-modal-safe-room-link"
        >
          <div className="kakao-open-chat-modal-safe-room-link-box">
            <ElectricBoltIcon />
            <span>전기기사 실기방</span>
          </div>
        </a>
        <a
          href="https://open.kakao.com/o/gddJX4Xe"
          target="_blank"
          rel="noreferrer"
          className="kakao-open-chat-modal-safe-room-link"
        >
          <div className="kakao-open-chat-modal-safe-room-link-box">
            <ComputerIcon />
            <span>정보처리기사 실기방</span>
          </div>
        </a>
      </KakaoOpenChatModalContainer>
    </Modal>
  );
};

export default KakaoOpenChatModal;

const KakaoOpenChatModalContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .kakao-open-chat-modal-safe-room-link-box {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    border: 1px solid ${palette.gray_300};
    border-style: dotted;
    padding: 10px 0;
    transition: all 0.3s;
    svg {
      width: 50px;
    }
    :hover {
      border-color: ${palette.blue_300};
      color: ${palette.blue_300};
    }
  }
`;
