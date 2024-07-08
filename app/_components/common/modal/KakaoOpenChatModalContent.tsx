import React from 'react';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ConstructionIcon from '@mui/icons-material/Construction';
import ScienceIcon from '@mui/icons-material/Science';
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
import palette from '../../../_styles/palette';
import { Button } from 'antd';
import { LocalStorage } from '../../../_lib/utils/localStorage';
import { OPEN_CHAT_MODAL_STATE } from '../../../_lib/constants';

interface KakaoOpenChatModalContentProps {
  onClose?: () => void;
}

const KakaoOpenChatModalContent: React.FC<
  KakaoOpenChatModalContentProps
> = () => {
  return (
    <KakaoOpenChatModalContentContainer>
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
        href="https://open.kakao.com/o/gmGo0ROf"
        target="_blank"
        rel="noreferrer"
        className="kakao-open-chat-modal-safe-room-link"
      >
        <div className="kakao-open-chat-modal-safe-room-link-box">
          <ScienceIcon />
          <span>위험물산업기사 실기방</span>
        </div>
      </a>
      <a
        href="https://open.kakao.com/o/gfNXScDf"
        target="_blank"
        rel="noreferrer"
        className="kakao-open-chat-modal-safe-room-link"
      >
        <div className="kakao-open-chat-modal-safe-room-link-box">
          <StarIcon />
          <span>정보공유방</span>
        </div>
      </a>
      <a
        href="https://open.kakao.com/o/gruSqfVe"
        target="_blank"
        rel="noreferrer"
        className="kakao-open-chat-modal-safe-room-link"
      >
        <div className="kakao-open-chat-modal-safe-room-link-box">
          <MenuBookIcon />
          <span>직8딴 구매자 톡방(방장: 저자)</span>
        </div>
      </a>
    </KakaoOpenChatModalContentContainer>
  );
};

export default KakaoOpenChatModalContent;

const KakaoOpenChatModalContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .kakao-open-chat-modal-safe-room-link-box {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color('colorText')};
    border: 1px solid ${palette.gray_400};
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
