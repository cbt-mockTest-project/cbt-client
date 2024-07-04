import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';
import palette from '@styles/palette';

const AdBannerInfoModalBlock = styled(Modal)`
  .ad-banner-info-modal-inner-title {
    font-size: 14px;
    padding: 5px 20px;
    border: 1px solid ${({ theme }) => theme.color('colorPrimary')};
    color: ${({ theme }) => theme.color('colorPrimary')};
    width: fit-content;
    border-radius: 50px;
    margin: 0 auto 0px auto;
  }
  .ad-banner-info-modal-inner-label {
    margin-top: 15px;
  }
  .ad-banner-info-modal-inner {
    a {
      color: ${({ theme }) => theme.color('colorPrimary')};
    }
  }
`;

interface AdBannerInfoModalProps extends Omit<ModalProps, 'children'> {}

const AdBannerInfoModal: React.FC<AdBannerInfoModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <AdBannerInfoModalBlock open={open} onClose={onClose}>
      <div className="ad-banner-info-modal-inner">
        <div className="ad-banner-info-modal-inner-title">문의</div>
        <div className="ad-banner-info-modal-inner-label">이메일</div>
        <a href="mailto:moducbt@gmail.com">moducbt@gmail.com</a>
        <div className="ad-banner-info-modal-inner-label">카카오톡</div>
        <a href="https://open.kakao.com/o/sZy6kxbf">
          https://open.kakao.com/o/sZy6kxbf
        </a>
      </div>
    </AdBannerInfoModalBlock>
  );
};

export default AdBannerInfoModal;
