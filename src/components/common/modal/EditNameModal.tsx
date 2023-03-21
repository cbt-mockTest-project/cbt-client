import useInput from '@lib/hooks/useInput';
import { Input } from 'antd';
import React, { MutableRefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

interface EditNameModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  defaultValue: string;
}

const EditNameModal: React.FC<EditNameModalProps> = ({
  open,
  onClose,
  onConfirm,
  defaultValue,
}) => {
  const value = useRef<string>(defaultValue);
  if (!open) {
    return null;
  }
  const props: ConfirmModalProps = {
    open,
    onClose,
    onCancel() {
      onClose();
    },
    onConfirm: () => {
      onConfirm(value.current);
      onClose();
    },
    content: <EditNameModalContent defaultValue={defaultValue} value={value} />,
    confirmLabel: '수정하기',
    cancelLabel: '취소하기',
  };
  return <ConfirmModal {...props} />;
};

export default EditNameModal;

const EditNameModalContainer = styled.div``;

interface EditNameModalContentProps
  extends Pick<EditNameModalProps, 'defaultValue'> {
  value: MutableRefObject<string>;
}

const EditNameModalContent: React.FC<EditNameModalContentProps> = ({
  defaultValue,
  value,
}) => {
  return (
    <EditNameModalContainer>
      <Input
        onChange={(e) => {
          value.current = e.target.value;
        }}
        defaultValue={defaultValue}
      />
    </EditNameModalContainer>
  );
};
