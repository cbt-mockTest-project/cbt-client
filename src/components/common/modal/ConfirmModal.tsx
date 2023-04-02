import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';

type ContentType = string | JSX.Element;
export interface ConfirmModalProps
  extends Pick<ModalProps, 'open' | 'onClose'> {
  content: ContentType;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
  confirmButtonLoading?: boolean;
  cancelButtonLoading?: boolean;
  disabled?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  open,
  onCancel,
  onConfirm,
  content,
  className,
  confirmLabel = '확인하기',
  cancelLabel = '취소하기',
  cancelButtonLoading = false,
  confirmButtonLoading = false,
  disabled = false,
}) => {
  const Content: React.FC<{ data: ContentType }> = ({ data }) => {
    if (typeof data === 'string') {
      return <pre>{data}</pre>;
    }
    return data;
  };
  return (
    <ConfirmModalContainer className={className}>
      <Modal open={open} onClose={onClose} className="confirm-modal">
        <div className="confirm-modal-wrapper">
          <div className="confirm-modal-content">
            <Content data={content} />
          </div>
          <div className="confirm-modal-button-wrapper">
            <Button
              onClick={onCancel}
              disabled={disabled}
              loading={cancelButtonLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              onClick={onConfirm}
              loading={confirmButtonLoading}
              disabled={disabled}
              type="primary"
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </Modal>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;

const ConfirmModalContainer = styled.div`
  .confirm-modal-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
    pre {
      text-align: center;
      font-weight: bold;
    }
  }
  .confirm-modal-content {
    margin: auto 0;
  }
  .confirm-modal-button-wrapper {
    button {
      width: 120px;
      height: 40px;
    }
    display: flex;
    justify-content: space-between;
  }
`;
