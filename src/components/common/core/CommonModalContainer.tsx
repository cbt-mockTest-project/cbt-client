import { loginModal, widhDrawalModal } from '@lib/constants';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import React from 'react';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';

interface ModalContainerProps {}

const CommonModalContainer: React.FC<ModalContainerProps> = () => {
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const onCloseModal = () => {
    dispatch(coreActions.closeModal());
  };
  return (
    <ModalContainerContainer>
      {modalName === loginModal && (
        <LoginModal open={modalName === loginModal} onClose={onCloseModal} />
      )}
    </ModalContainerContainer>
  );
};

export default CommonModalContainer;

const ModalContainerContainer = styled.div``;
