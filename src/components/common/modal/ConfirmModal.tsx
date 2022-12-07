import { Button } from 'antd';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

interface ConfirmModalProps
  extends Pick<ComponentProps<typeof Modal>, 'open' | 'onClose'> {
  content: string | string[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  open,
  onCancel,
  onConfirm,
  content,
}) => {
  return (
    <ConfirmModalContainer>
      <Modal open={open} onClose={onClose}>
        <div className="confirm-modal-wrapper">
          <div className="confirm-modal-content">
            {typeof content === 'string'
              ? content
              : content.map((value, index) => <p key={index}>{value}</p>)}
          </div>
          <div className="confirm-modal-button-wrapper">
            <Button onClick={onCancel}>취소하기</Button>
            <Button onClick={onConfirm} type="primary">
              확인하기
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
