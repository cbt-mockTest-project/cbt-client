import palette from '../../../_styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import { isMobile } from 'react-device-detect';
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
      if (isMobile) {
        alert('모바일에서는 지원하지 않습니다.');
        return;
      }
      router.push('/exam/write');
    },
    content: <MakeExamModalContent />,
    confirmLabel: '시험지 만들기',
    cancelLabel: '취소하기',
  };
  return <ConfirmModal {...props} />;
};

const MakeExamModalContent: React.FC = () => {
  return (
    <MakeExamModalContentContainer>
      <h3 className="make-exam-modal-content-title">※ 시험지만들기 - 베타</h3>
      <ul>
        <li>
          <p>1. 현재는 pc환경에서만 이용 가능 합니다.</p>
        </li>
        <li>
          <p>2. 제작된 시험지는 검토 후, 등록됩니다.</p>
        </li>
        <li>
          <p>3. 제작된 시험지는 모든 유저에게 공개됩니다.</p>
        </li>
        <li>
          <p>4. 승인된 시험지는 임의로 삭제할 수 없습니다.</p>
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
