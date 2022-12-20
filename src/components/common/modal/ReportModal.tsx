import TextArea from 'antd/lib/input/TextArea';
import React, { ChangeEvent, ComponentProps, useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

interface ReportModalProps extends Omit<ConfirmModalProps, 'content'> {
  title: string | string[];
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
}) => {
  return (
    <ReportModalContainer>
      <ConfirmModal
        open={open}
        content={<Content title={title} onChange={onChange} />}
        onClose={onClose}
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmLabel={confirmLabel}
      />
    </ReportModalContainer>
  );
};

export default ReportModal;

interface Content extends Pick<ReportModalProps, 'title' | 'onChange'> {}

const Content: React.FC<Content> = ({ title, onChange }) => {
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
      <pre>{title}</pre>
      <TextArea
        autoSize={{ minRows: 6, maxRows: 10 }}
        value={value}
        onChange={onChangeValue}
      />
    </ContentContainer>
  );
};

const ReportModalContainer = styled.div``;

const ContentContainer = styled.div`
  pre {
    text-align: center;
    font-weight: bold;
  }
  textarea {
    margin-top: 25px;
  }
`;
