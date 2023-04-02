import palette from '@styles/palette';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

interface PdfDownloadSelectModalProps
  extends Omit<ConfirmModalProps, 'content'> {}

const PdfDownloadSelectModal: React.FC<PdfDownloadSelectModalProps> = (
  props
) => {
  return (
    <PdfDownloadSelectModalContainer
      {...props}
      confirmLabel="정답 포함"
      cancelLabel="정답 미포함"
      disabled={isMobile}
      content={<PdfDownloadSelectModaContent />}
    />
  );
};

export default PdfDownloadSelectModal;

const PdfDownloadSelectModalContainer = styled(ConfirmModal)``;

const PdfDownloadSelectModaContent: React.FC = () => (
  <PdfDownloadSelectModaContentContainer>
    <p>다운로드 형태를 선택해주세요.</p>
    <p className="pdf-download-select-modal-description">
      어플에서는 작동하지 않습니다.
    </p>
    <p className="pdf-download-select-modal-description">
      pc환경에서 이용해주세요.
    </p>
  </PdfDownloadSelectModaContentContainer>
);

const PdfDownloadSelectModaContentContainer = styled.div`
  .pdf-download-select-modal-description {
    font-size: 12px;
    color: ${palette.gray_700};
  }
`;
