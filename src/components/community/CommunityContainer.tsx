import { useLazyReadPosts } from '@lib/graphql/user/hook/usePost';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PostCategory } from 'types';
import { CommunityViewProps } from './Community.interface';
import CommunityView from './CommunityView';

interface CommunityContainerProps {}

const CommunityContainer: React.FC<CommunityContainerProps> = () => {
  const router = useRouter();
  const [readPosts, { data: postsQuery, loading: readPostsLoading }] =
    useLazyReadPosts();
  useEffect(() => {
    if (router.query.c) {
      readPosts({
        variables: {
          input: {
            limit: 20,
            page: 1,
            category: router.query.c as PostCategory,
          },
        },
      });
    }
  }, [router.query.c]);
  const checkCategoryMatching = (query: string) => query === router.query.c;
  const communityViewProps: CommunityViewProps = {
    checkCategoryMatching,
    postsQuery,
  };
  return <CommunityView {...communityViewProps} />;
};

export default CommunityContainer;
