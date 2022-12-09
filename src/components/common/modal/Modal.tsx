import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import palette from '@styles/palette';
interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  children,
  onClose,
  className,
}) => {
  if (!open) return null;
  return (
    <>
      <ModalContainer className={className}>
        <div className="modal-wrapper">
          <span onClick={onClose} className="modal-close-button">
            <ClearIcon />
          </span>
          {children}
        </div>
      </ModalContainer>
      <Dimmed onClick={onClose} />
    </>
  );
};

export default Modal;

const ModalContainer = styled.div`
  @keyframes slidein {
    from {
      transform: translateY(-500px);
    }
    to {
      transform: translateY(0px);
    }
  }
  animation: slidein 0.5s;
  position: fixed;
  background-color: white;
  padding: 30px 50px;
  border-radius: 5px;
  margin: auto;
  top: 20%;
  left: 0;
  right: 0;
  max-width: 350px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  .modal-container {
  }

  .modal-wrapper {
    position: relative;
    width: 100%;
  }
  .modal-close-button {
    position: absolute;
    user-select: none;
    top: -15px;
    right: -35px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease-in;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
`;

const Dimmed = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
