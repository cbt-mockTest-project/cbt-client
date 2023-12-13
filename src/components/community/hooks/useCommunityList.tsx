import { adminBoards } from '@lib/constants';
import { useLazyReadPosts } from '@lib/graphql/hook/usePost';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PostCategory, UserRole } from 'types';

const useCommunityList = () => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const [search, setSearch] = useState((router.query.s as string) || '');

  const [readPosts, { data: postsQuery, loading: readPostsLoading }] =
    useLazyReadPosts();
  const isAdminOnlyCategory = adminBoards.includes(
    router.query.c as PostCategory
  );

  const isLogged = meQuery?.me.ok;
  const isAdmin = meQuery?.me.user?.role === UserRole.Admin;
  const allowWriteAdminOnlyCategory = !isAdminOnlyCategory || isAdmin;
  const posts = postsQuery?.readPosts.posts;
  const postCount = postsQuery?.readPosts.count;

  useEffect(() => {
    if (router.query.c) {
      readPosts({
        variables: {
          input: {
            limit: 8,
            page: Number(router.query.p) || 1,
            category: router.query.c as PostCategory,
            search,
          },
        },
      });
    }
  }, [readPosts, router.query.c, router.query.p, router.query.s, search]);

  return {
    isLogged,
    isAdmin,
    allowWriteAdminOnlyCategory,
    posts,
    postCount,
    search,
    setSearch,
  };
};

export default useCommunityList;
