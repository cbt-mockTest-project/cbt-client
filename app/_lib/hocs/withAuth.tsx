import { ComponentType, PropsWithChildren } from 'react';
import { useMeQuery } from '../graphql/hook/useUser';
import AuthComponent from '../../_components/auth/AuthComponent';
import { UserRole } from '../../types';

function withAuth<T>(WrappedComponent: ComponentType<T>, roles?: UserRole[]) {
  const WithAuthComponent: ComponentType<PropsWithChildren<T>> = (props) => {
    const { data: meQuery } = useMeQuery();
    if (!meQuery) return null;
    if (roles && !roles.includes(meQuery.me.user.role))
      return <AuthComponent />;
    if (!meQuery.me.user) return <AuthComponent />;
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = WrappedComponent.displayName;

  return WithAuthComponent;
}

export default withAuth;
