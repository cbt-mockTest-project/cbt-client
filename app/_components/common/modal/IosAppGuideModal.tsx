import palette from '../../../_styles/palette';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';

interface IosAppGuideModalProps extends Omit<ModalProps, 'children'> {}

const IosAppGuideModal: React.FC<IosAppGuideModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <IosAppGuideModalContainer>
        <p className="ios-app-title">모두CBT를 앱처럼 사용하기</p>
        <p className="ios-app-content">홈 화면에 추가하기를 누르면</p>
        <p className="ios-app-content">앱이 설치됩니다.</p>
        <div className="ios-app-guide-image-wrapper">
          <Image src="/png/guide/ios-app-guide.png" alt="ios-app-guide" fill />
        </div>
      </IosAppGuideModalContainer>
    </StyledModal>
  );
};

export default IosAppGuideModal;

const StyledModal = styled(Modal)`
  padding: 30px 20px;
  .modal-close-button {
    right: -10px;
  }
`;

const IosAppGuideModalContainer = styled.div`
  .ios-app-guide-image-wrapper {
    margin-top: 15px;
    border: 1px solid ${palette.gray_200};
    position: relative;
    height: 250px;
  }
  .ios-app-title {
    font-weight: bold;
  }
  .ios-app-content {
    font-size: 0.9rem;
    color: ${palette.gray_500};
  }
`;
