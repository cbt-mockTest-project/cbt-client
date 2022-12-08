import { Button } from 'antd';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

type ContentType = string | string[] | JSX.Element;
interface ConfirmModalProps
  extends Pick<ComponentProps<typeof Modal>, 'open' | 'onClose'> {
  content: ContentType;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  open,
  onCancel,
  onConfirm,
  content,
  confirmLabel = '확인하기',
  cancelLabel = '취소하기',
}) => {
  const Content: React.FC<{ data: ContentType }> = ({ data }) => {
    if (Array.isArray(data)) {
      return (
        <>
          {data.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </>
      );
    }
    if (typeof data === 'string') {
      return <p>{data}</p>;
    }
    return data;
  };
  return (
    <ConfirmModalContainer>
      <Modal open={open} onClose={onClose}>
        <div className="confirm-modal-wrapper">
          <div className="confirm-modal-content">
            <Content data={content} />
          </div>
          <div className="confirm-modal-button-wrapper">
            <Button onClick={onCancel}>{cancelLabel}</Button>
            <Button onClick={onConfirm} type="primary">
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
  }
  .confirm-modal-content {
    padding: 50px 0;
    margin: auto 0;
    p {
      text-align: center;
      font-weight: bold;
    }
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
