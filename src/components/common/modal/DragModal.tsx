import React from 'react';
import styled, { css } from 'styled-components';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { Dimmed, ModalProps } from './Modal';
import ClearIcon from '@mui/icons-material/Clear';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';

interface DragModalProps extends Omit<ModalProps, 'children'> {
  className?: string;
  onNewWindow?: () => void;
  children: React.ReactNode;
}

const DragModal: React.FC<DragModalProps> = ({
  onClose,
  open,
  className,
  onNewWindow,
  children,
}) => {
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.velocity.y > 100) {
      onClose();
    }
  };
  return (
    <div>
      <AnimatePresence>
        {open && (
          <>
            <DragModalContainer
              className={className || ''}
              drag={'y'}
              dragConstraints={{
                bottom: 0,
                top: 0,
              }}
              dragElastic={1}
              initial={{ y: '100%' }}
              animate={{ y: '0', transition: { duration: 0.4 } }}
              exit={{ y: '100%', transition: { duration: 0.4 } }}
              onDragEnd={onDragEnd}
            >
              <div className="modal-wrapper">
                <>
                  <span onClick={onClose} className="modal-close-button">
                    <ClearIcon />
                  </span>
                  <span onClick={onClose} className="modal-drag-position">
                    <DragHandleIcon />
                  </span>
                </>
                {children}
              </div>
            </DragModalContainer>
            <Dimmed onClick={onClose} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragModal;

interface DragModalContainerProps {}

const DragModalContainer = styled(motion.div)<DragModalContainerProps>`
  position: fixed;
  background-color: white;
  padding: 30px 50px;
  border-radius: 5px;
  margin: auto;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: ${palette.gray_100};

  .comment-title {
    font-weight: bold;
    white-space: pre-line;
    display: block;
  }
  .modal-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
  }
  .comment-box {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    overflow-y: scroll;
  }

  .comment-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    button {
      border-radius: 5px;
      width: 100px;
      margin-left: auto;
    }
    textarea {
      border-radius: 5px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
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
  .modal-new-window-button {
    position: absolute;
    top: -15px;
    right: 0;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease-in;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
  .modal-drag-position {
    display: none;
  }

  @media (max-width: ${responsive.medium}) {
    padding: 30px 20px;

    .modal-close-button {
      right: -5px;
    }
    .comment-title {
      margin-top: 10px;
      font-size: 0.9rem;
    }
    .modal-new-window-button {
      right: 30px;
    }

    .modal-drag-position {
      display: block;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.2rem;
      cursor: pointer;
      svg {
        font-size: 35px;
      }
    }
  }
  @media (max-width: ${responsive.small}) {
    .modal-new-window-button {
      display: none;
    }
    width: 100% !important;
    padding-bottom: 0;
  }
`;
