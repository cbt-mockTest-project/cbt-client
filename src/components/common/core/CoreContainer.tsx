import { loginModal, widhDrawalModal } from '@lib/constants';
import { usePostCommentNotice } from '@lib/graphql/user/hook/useNotice';
import { useLazyMeQuery } from '@lib/graphql/user/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';
declare global {
  interface Window {
    Kakao: any;
  }
}

interface CoreContainerProps {}

const CoreContainer: React.FC<CoreContainerProps> = () => {
  // const { data } = usePostCommentNotice();
  // const [requestMeQuery] = useLazyMeQuery();
  // useEffect(() => {
  //   if (data?.postCommentUpdates.ok) {
  //     requestMeQuery();
  //   }
  // }, [data]);
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
