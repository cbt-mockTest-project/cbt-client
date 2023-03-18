import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';
interface MakeExamModalProps {
  open: boolean;
  onClose: () => void;
}

const MakeExamModal: React.FC<MakeExamModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  if (!open) {
    return null;
  }
  const props: ConfirmModalProps = {
    open,
    onClose,
    onCancel() {
      onClose();
    },
    onConfirm() {
      router.push('/exam/write');
    },
    content: <MakeExamModalContent />,
    confirmLabel: '시험지만들기',
    cancelLabel: '취소하기',
  };
  return <ConfirmModal {...props} />;
};

const MakeExamModalContent: React.FC = () => {
  return (
    <MakeExamModalContentContainer>
      <h3 className="make-exam-modal-content-title">※ 시험지만들기</h3>
      <ul>
        <li>
          <p>1. 시험지 1개당 문제는 20문제 까지 추가가 가능합니다.</p>
        </li>
        <li>
          <p>2. 시험지 1개당 최소 5문제 이상 등록해주셔야 합니다.</p>
        </li>
        <li>
          <p>3. 베타서비스 단계로 1인 1개의 시험지만 제작이 가능합니다.</p>
        </li>
        <li>
          <p>4. 제작된 시험지는 모든 유저에게 공개됩니다.</p>
        </li>
      </ul>
    </MakeExamModalContentContainer>
  );
};

export default MakeExamModal;

const MakeExamModalContentContainer = styled.div`
  .make-exam-modal-content-title {
    font-size: 1.2rem;
    padding: 15px 0;
  }
  p {
    font-size: 1rem;
    color: ${palette.gray_900};
  }
`;
