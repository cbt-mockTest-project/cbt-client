import { loginModal } from '../constants';
import { useMeQuery } from '../graphql/hook/useUser';
import { coreActions } from '../../_modules/redux/slices/core';
import { useAppDispatch } from '../../_modules/redux/store/configureStore';
import { useMemo } from 'react';
import useApolloClient from './useApolloCient';
import { MeQuery } from '../graphql/query/userQuery.generated';
import { ME_QUERY } from '../graphql/query/userQuery';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { data: meQuery } = useMeQuery();
  const { updateCache } = useApolloClient();
  const isLoggedIn = useMemo(() => !!meQuery?.me.user, [meQuery]);
  const user = useMemo(() => meQuery?.me.user, [meQuery]);
  const handleCheckLogin = () => {
    if (!isLoggedIn) {
      dispatch(coreActions.openModal(loginModal));
      return false;
    }
    return true;
  };

  const handleUpdateUserCache = (
    user: Partial<MeQuery['me']['user']> | null
  ) => {
    updateCache<MeQuery>(
      {
        query: ME_QUERY,
      },
      (data) => ({
        ...data,
        me: {
          ...data.me,
          user: {
            ...data.me.user,
            ...user,
          },
        },
      })
    );
  };

  return {
    isLoggedIn,
    handleCheckLogin,
    handleUpdateUserCache,
    user,
  };
};

export default useAuth;
