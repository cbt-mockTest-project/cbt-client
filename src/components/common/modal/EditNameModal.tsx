import React from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

interface EditNameModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EditNameModal: React.FC<EditNameModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  if (!open) {
    return null;
  }
  const props: ConfirmModalProps = {
    open,
    onClose,
    onCancel() {
      onClose();
    },
    onConfirm,
    content: <EditNameModalContent />,
    confirmLabel: '수정하기',
    cancelLabel: '취소하기',
  };
  return <ConfirmModal {...props} />;
};

export default EditNameModal;

const EditNameModalContainer = styled.div``;

const EditNameModalContent: React.FC = () => {
  return null;
};
