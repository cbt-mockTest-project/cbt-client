import palette from '@styles/palette';
import React, { ComponentProps } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';
import { Checkbox, CheckboxProps } from 'antd';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

export interface PdfDownloadSelectModalFooter {
  hasAdditionalAnswer?: boolean;
  onCheckboxChange?: CheckboxProps['onChange'];
}
interface PdfDownloadSelectModalProps
  extends Omit<ConfirmModalProps, 'content'> {
  footerOptions?: PdfDownloadSelectModalFooter;
}

const PdfDownloadSelectModal: React.FC<PdfDownloadSelectModalProps> = (
  props
) => {
  return (
    <PdfDownloadSelectModalContainer
      {...props}
      onConfirm={() => props.onConfirm({ pdfMake, pdfFonts })}
      onCancel={() => props.onCancel({ pdfMake, pdfFonts })}
      confirmLabel="정답 포함"
      cancelLabel="정답 미포함"
      content={<PdfDownloadSelectModalContent />}
      footer={
        props.footerOptions ? (
          <PdfDownloadSelectModalFooter
            onChange={props.footerOptions.onCheckboxChange}
            hasAdditionalAnswer={props.footerOptions.hasAdditionalAnswer}
          />
        ) : null
      }
    />
  );
};

export default PdfDownloadSelectModal;

const PdfDownloadSelectModalContainer = styled(ConfirmModal)``;

interface PdfDownloadSelectModalFooterProps {
  hasAdditionalAnswer?: boolean;
  onChange: CheckboxProps['onChange'];
}

const PdfDownloadSelectModalFooter: React.FC<
  PdfDownloadSelectModalFooterProps
> = ({ hasAdditionalAnswer, onChange }) => {
  return (
    <div>
      <Checkbox checked={hasAdditionalAnswer} onChange={onChange}>
        추가답안 포함
      </Checkbox>
    </div>
  );
};

const PdfDownloadSelectModalContent: React.FC = () => (
  <PdfDownloadSelectModalContentContainer>
    <p>다운로드 형태를 선택해주세요.</p>
  </PdfDownloadSelectModalContentContainer>
);

const PdfDownloadSelectModalContentContainer = styled.div`
  .pdf-download-select-modal-description {
    font-size: 12px;
    color: ${palette.gray_700};
  }
`;
