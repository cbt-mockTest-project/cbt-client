import { ComponentType, PropsWithChildren } from 'react';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import AuthComponent from '@components/auth/AuthComponent';

function withAuth<T>(WrappedComponent: ComponentType<T>) {
  const WithAuthComponent: ComponentType<PropsWithChildren<T>> = (props) => {
    const { data: meQuery } = useMeQuery();
    if (!meQuery) return null;
    if (!meQuery.me.user) return <AuthComponent />;
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = WrappedComponent.displayName;

  return WithAuthComponent;
}

export default withAuth;
