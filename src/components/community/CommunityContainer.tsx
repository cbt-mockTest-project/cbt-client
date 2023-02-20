import { loginModal } from '@lib/constants';
import { useLazyReadPosts } from '@lib/graphql/user/hook/usePost';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PostCategory } from 'types';
import { CommunityViewProps } from './Community.interface';
import CommunityView from './CommunityView';

interface CommunityContainerProps {}

const CommunityContainer: React.FC<CommunityContainerProps> = () => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  // 추후 캐시 최적화 예정
  const [readPosts, { data: postsQuery, loading: readPostsLoading }] =
    useLazyReadPosts('network-only');
  useEffect(() => {
    if (router.query.c) {
      readPosts({
        variables: {
          input: {
            limit: 8,
            page: Number(router.query.p) || 1,
            category: router.query.c as PostCategory,
          },
        },
      });
    }
  }, [router.query.c, router.query.p]);
  const checkCategoryMatching = (query: string) => query === router.query.c;
  const communityViewProps: CommunityViewProps = {
    checkCategoryMatching,
    postsQuery,
    meQuery,
    openLoginModal,
    readPostsLoading,
  };
  return <CommunityView {...communityViewProps} />;
};

export default CommunityContainer;
