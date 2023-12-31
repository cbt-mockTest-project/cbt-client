import { loginModal } from '@lib/constants';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import React from 'react';
import styled from 'styled-components';
import AuthModal from '@components/auth/AuthModal';

interface CoreContainerProps {}

const CoreContainer: React.FC<CoreContainerProps> = () => {
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);

  const onCloseModal = () => {
    dispatch(coreActions.closeModal());
  };

  return (
    <CoreContainerBlock>
      {modalName === loginModal && (
        <AuthModal open={true} onCancel={onCloseModal} />
      )}
      <div id="portal" />
    </CoreContainerBlock>
  );
};

export default CoreContainer;

const CoreContainerBlock = styled.div``;
