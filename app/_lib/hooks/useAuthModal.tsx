import { loginModal } from '../constants';
import { coreActions } from '../../_modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '../../_modules/redux/store/configureStore';

const useAuthModal = () => {
  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector(
    (state) => state.core.modalName === loginModal
  );
  const openAuthModal = () => dispatch(coreActions.openModal(loginModal));
  const closeAuthModal = () => dispatch(coreActions.closeModal());

  return {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };
};

export default useAuthModal;
