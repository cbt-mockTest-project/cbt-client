import React from 'react';
import styled, { css } from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import palette from '@styles/palette';
export interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  animationDirection?: 'top' | 'bottom';
  animation?: boolean;
  hasCloseIcon?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  animation = true,
  animationDirection = 'top',
  children,
  onClose,
  className,
  hasCloseIcon = true,
}) => {
  if (!open) return null;
  return (
    <>
      <ModalContainer
        className={className}
        animation={animation}
        animationDirection={animationDirection}
      >
        <div className="modal-wrapper">
          {hasCloseIcon && (
            <span onClick={onClose} className="modal-close-button">
              <ClearIcon />
            </span>
          )}
          {children}
        </div>
      </ModalContainer>
      <Dimmed onClick={onClose} />
    </>
  );
};

export default Modal;

interface ModalContainerProps
  extends Pick<ModalProps, 'animation' | 'animationDirection'> {}

const ModalContainer = styled.div<ModalContainerProps>`
  @keyframes slidein {
    from {
      transform: ${(props) =>
        props.animationDirection === 'top'
          ? 'translateY(-500px)'
          : 'translateY(500px)'};
    }
    to {
      transform: translateY(0px);
    }
  }
  ${(props) =>
    props.animation &&
    css`
      animation: slidein 0.5s;
    `}

  position: fixed;
  background-color: white;
  padding: 30px 50px;
  border-radius: 5px;
  margin: auto;
  top: 20%;
  left: 0;
  right: 0;
  max-width: 350px;
  z-index: 999;
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

export const Dimmed = styled.div`
  z-index: 900;
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
