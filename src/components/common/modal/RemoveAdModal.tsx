import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';
import palette from '@styles/palette';
import { Button } from 'antd';
import Link from 'next/link';

interface RemoveAdModalProps extends Omit<ModalProps, 'children'> {}

const RemoveAdModal: React.FC<RemoveAdModalProps> = ({ open, onClose }) => {
  return (
    <RemoveAdModalContainer open={open} onClose={onClose}>
      <label className="remove-ad-modal-title-label">광고제거 안내</label>
      <p className="remove-ad-modal-content">
        {
          '모두CBT는 광고비를 통해 운영되고 있으며,\n후원자 분들에 한해서는 광고를 제거해 드리고 있습니다.'
        }
      </p>
      <Link
        className="remove-ad-modal-link-button"
        href="https://www.buymeacoffee.com/moducbts"
      >
        <Button type="primary">후원하러 가기</Button>
      </Link>
    </RemoveAdModalContainer>
  );
};

export default RemoveAdModal;

const RemoveAdModalContainer = styled(Modal)`
  .remove-ad-modal-title-label {
    font-size: 0.8rem;
    display: block;
    width: max-content;
    margin: 0 auto;
    padding: 5px 10px;
    border-radius: 50px;
    color: ${palette.antd_blue_01};
    border: 1px solid ${palette.antd_blue_01};
  }
  .remove-ad-modal-content {
    margin-top: 20px;
    word-break: break-all;
    white-space: pre-line;
  }
  .remove-ad-modal-link-button {
    button {
      height: 40px;
      width: 100%;
      margin-top: 20px;
    }
  }
`;
