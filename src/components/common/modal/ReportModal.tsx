import palette from '@styles/palette';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';
import { Radio } from 'antd';
import { checkboxOption } from 'customTypes';
import { QuestionFeedbackType } from 'types';
import CreateQuestionEditor from '@components/exam/write/CreateQuestionEditor';

export const feedbackOptions: checkboxOption[] = [
  { label: '공개', value: QuestionFeedbackType.Public },
  { label: '비공개', value: QuestionFeedbackType.Private },
  { label: '오류신고', value: QuestionFeedbackType.Report },
];
interface ReportModalProps extends Omit<ConfirmModalProps, 'content'> {
  title: string | string[];
  label?: string;
  placeholder?: string;
  onChangeContent?: (value: string) => void;
  onChangeType?: (value: QuestionFeedbackType) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
  onChangeContent,
  onChangeType,
  confirmLabel,
  title,
  label,
  placeholder,
}) => {
  return (
    <ReportModalContainer>
      <ConfirmModal
        className="report-confirm-modal"
        open={open}
        content={
          <Content
            title={title}
            onChangeContent={onChangeContent}
            onChangeType={onChangeType}
            label={label}
            placeholder={placeholder}
          />
        }
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
  extends Pick<
    ReportModalProps,
    'title' | 'onChangeContent' | 'label' | 'placeholder' | 'onChangeType'
  > {}

const Content: React.FC<Content> = ({
  title,
  onChangeContent,
  onChangeType,
  label,
  placeholder,
}) => {
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<QuestionFeedbackType>(
    QuestionFeedbackType.Public
  );

  useEffect(() => {
    if (content && onChangeContent) {
      onChangeContent(content);
    }
  }, [content]);
  useEffect(() => {
    if (selectedType && onChangeType) {
      onChangeType(selectedType);
    }
  });

  return (
    <ContentContainer>
      {label && <label className="content-label">{label}</label>}
      <pre className="content-title">{title}</pre>
      <Radio.Group
        className="content-feedback-type-checkbox-group"
        defaultValue={QuestionFeedbackType.Public}
        onChange={(e) => {
          setSelectedType(e.target.value);
        }}
        options={feedbackOptions}
      />
      <CreateQuestionEditor
        content={content}
        setContent={setContent}
        placeholder={placeholder}
        className="content-feedback-editor"
      />
    </ContentContainer>
  );
};

const ReportModalContainer = styled.div`
  .report-confirm-modal {
    .modal-close-button {
      top: -7px;
      right: -15px;
    }
    .confirm-modal {
      padding: 20px 25px;
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
  .content-title {
    font-size: 0.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .content-feedback-type-checkbox-group {
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }
  .content-feedback-editor {
    margin-top: 20px;
  }
`;
