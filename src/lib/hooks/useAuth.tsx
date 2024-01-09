import { loginModal } from '@lib/constants';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { useMemo } from 'react';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { data: meQuery } = useMeQuery();
  const isLoggedIn = useMemo(() => !!meQuery?.me.user, [meQuery]);
  const user = useMemo(() => meQuery?.me.user, [meQuery]);
  const handleCheckLogin = () => {
    if (!isLoggedIn) {
      dispatch(coreActions.openModal(loginModal));
      return false;
    }
    return true;
  };

  return {
    isLoggedIn,
    handleCheckLogin,
    user,
  };
};

export default useAuth;
