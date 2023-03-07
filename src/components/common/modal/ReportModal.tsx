import palette from '@styles/palette';
import TextArea from 'antd/lib/input/TextArea';
import React, { ChangeEvent, ComponentProps, useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

interface ReportModalProps extends Omit<ConfirmModalProps, 'content'> {
  title: string | string[];
  label?: string;
  onChange?: (value: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
  onChange,
  confirmLabel,
  title,
  label,
}) => {
  return (
    <ReportModalContainer>
      <ConfirmModal
        className="report-confirm-modal"
        open={open}
        content={<Content title={title} onChange={onChange} label={label} />}
        onClose={onClose}
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmLabel={confirmLabel}
      />
    </ReportModalContainer>
  );
};

export default ReportModal;

interface Content
  extends Pick<ReportModalProps, 'title' | 'onChange' | 'label'> {}

const Content: React.FC<Content> = ({ title, onChange, label }) => {
  const [value, setValue] = useState('');
  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (value && onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <ContentContainer>
      {label && <label className="content-label">{label}</label>}
      <pre>{title}</pre>
      <TextArea
        autoSize={{ minRows: 6, maxRows: 10 }}
        value={value}
        onChange={onChangeValue}
      />
    </ContentContainer>
  );
};

const ReportModalContainer = styled.div`
  .report-confirm-modal {
    .confirm-modal {
      max-width: 500px;
    }
    .confirm-modal-button-wrapper {
      gap: 10px;
      button {
        width: 100%;
      }
    }
  }
`;

const ContentContainer = styled.div`
  pre {
    text-align: center;
    font-weight: bold;
  }
  textarea {
    margin-top: 25px;
  }
  .content-label {
    display: block;
    margin: 0 auto;
    margin-bottom: 0px;
    position: relative;
    bottom: 15px;
    width: max-content;
    font-size: 0.8rem;
    color: ${palette.antd_blue_01};
    border: 1px solid ${palette.antd_blue_01};
    padding: 5px 20px;
    border-radius: 50px;
  }
`;
