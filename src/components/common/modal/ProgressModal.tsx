import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import palette from '@styles/palette';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

interface ProgressModalProps
  extends Pick<ComponentProps<typeof Modal>, 'open' | 'onClose'> {}

const ProgressModal: React.FC<ProgressModalProps> = ({ onClose, open }) => {
  return (
    <ProgressModalContainer>
      <Modal open={open} onClose={onClose} className="progress-modal-container">
        <h2 className="progress-modal-title">진도체크</h2>
        <ExamAchievementResultList className="progress-modal-achievement-result-list" />
        <p className="progress-modal-info">
          번호를 클릭하면 해당 문제로 이동 합니다.
        </p>
      </Modal>
    </ProgressModalContainer>
  );
};

export default ProgressModal;

const ProgressModalContainer = styled.div`
  .progress-modal-container {
    padding: 20px 0px;
    .modal-close-button {
      margin: 10px 50px;
    }
  }
  .progress-modal-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${palette.gray_900};
    border-bottom: 1px solid ${palette.gray_300};
    padding: 0 0px 10px 50px;
  }
  .progress-modal-achievement-result-list {
    padding: 10px 30px;
    max-height: 350px;
  }
  .progress-modal-info {
    border-top: 1px solid ${palette.gray_300};
    padding-top: 10px;
    text-align: center;
    font-size: 0.9rem;
    color: ${palette.antd_blue_02};
  }
`;
