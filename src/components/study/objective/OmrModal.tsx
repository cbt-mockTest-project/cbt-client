import { Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import ObjectiveStudyOmrCard from './testMode/ObjectiveStudyOmrCard';

const OmrModalBlock = styled(Modal)`
  width: fit-content !important;
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-close {
    top: -30px;
    right: 0;
    color: white !important;
  }
`;

interface OmrModalProps extends Omit<ModalProps, 'children'> {}

const OmrModal: React.FC<OmrModalProps> = (props) => {
  const { ...modalProps } = props;
  return (
    <OmrModalBlock {...modalProps} footer={null}>
      <ObjectiveStudyOmrCard />
    </OmrModalBlock>
  );
};
export default OmrModal;
