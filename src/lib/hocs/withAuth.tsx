import { useRouter } from 'next/router';
import { useEffect, ComponentType, PropsWithChildren } from 'react';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { UserRole } from 'types';

function withAuth<T>(
  WrappedComponent: ComponentType<T>,
  userRole: UserRole = UserRole.Client,
  redirectPath: string = '/auth'
) {
  const WithAuthComponent: ComponentType<PropsWithChildren<T>> = (props) => {
    const router = useRouter();
    const { data: meQuery } = useMeQuery();
    useEffect(() => {
      if (!meQuery) return;
      if (userRole === UserRole.Client) {
        if (!meQuery.me.user) {
          router.push(redirectPath);
        }
      }
    }, [meQuery]);

    if (!meQuery) return null;
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithAuthComponent;
}

export default withAuth;
