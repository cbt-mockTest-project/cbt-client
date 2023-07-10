import { loginModal } from '@lib/constants';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';

interface CoreContainerProps {}

const CoreContainer: React.FC<CoreContainerProps> = () => {
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const onCloseModal = () => {
    dispatch(coreActions.closeModal());
  };
  useEffect(() => {
    if (!window.Kakao.isInitialized() && window && window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);
  return (
    <CoreContainerBlock>
      {modalName === loginModal && (
        <LoginModal open={modalName === loginModal} onClose={onCloseModal} />
      )}
      <div id="portal" />
    </CoreContainerBlock>
  );
};

export default CoreContainer;

const CoreContainerBlock = styled.div``;
