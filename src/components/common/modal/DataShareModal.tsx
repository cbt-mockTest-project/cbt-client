import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';

interface DataShareModalProps extends Omit<ModalProps, 'children'> {}

const DataShareModal: React.FC<DataShareModalProps> = ({ open, onClose }) => {
  return (
    <DataShareModalContainer open={open} onClose={onClose}>
      <h3>자료공유 및 문의하기</h3>
      <ul>
        <li>
          <p>
            {`모두CBT사이트에 추가적으로 올라갔으면 하는 자료가 있으시다면 공유해주세요.\n(검토후 업로드 됩니다.)`}
          </p>
        </li>
        <li>
          <p>기타 문의사항이 있다면 문의해주세요.</p>
        </li>
        <li>
          <p>자료공유 및 문의사항은 아래 메일로 보내주세요</p>
        </li>
      </ul>
      <a href="mailto:moducbt@gmail.com">moducbt@gmail.com</a>
    </DataShareModalContainer>
  );
};

export default DataShareModal;

const DataShareModalContainer = styled(Modal)`
  max-width: 500px;
  padding: 30px 30px;
  .modal-close-button {
    right: -20px;
  }
  ul {
    list-style: disc;
    font-size: 0.9rem;
    margin: 10px 0;
    margin-left: 20px;
    li {
    }
  }
  p {
    font-size: 0.9rem;
    white-space: pre-wrap;
  }
  a {
    color: ${palette.blue_300};
  }
`;
