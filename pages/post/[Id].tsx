import Layout from '@components/common/layout/Layout';
import { useLazyReadPost, useViewPost } from '@lib/graphql/user/hook/usePost';
import { READ_POST, READ_POSTS } from '@lib/graphql/user/query/postQuery';
import {
  ReadPostQuery,
  ReadPostQueryVariables,
  ReadPostsQuery,
} from '@lib/graphql/user/query/postQuery.generated';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { postViewCookie } from '@lib/constants/cookie';
import PostDetailContainer from '@components/post/detail/PostDetailContainer';
interface PostPageProps {
  postQuery: ReadPostQuery;
}

const PostPage: NextPage<PostPageProps> = ({ postQuery }) => {
  const [readPost, { data: postQueryOnClientSide }] =
    useLazyReadPost('network-only');
  const [viewPost] = useViewPost();
  const client = useApollo({}, '');
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (router.query.Id) {
        const id = Number(router.query.Id);
        const postViewCookieValue = getCookie(postViewCookie);
        if (!postViewCookieValue) {
          viewPost({ variables: { input: { postId: id } } });
          // 조회수 30분에 한번씩 카운트
          setCookie(postViewCookie, 'view', { maxAge: 60 * 30 });
        }

        const res = await readPost({
          variables: { input: { id } },
        });
        if (res.data?.readPost.ok) {
          client.writeQuery<ReadPostQuery>({
            query: READ_POST,
            data: {
              readPost: res.data.readPost,
            },
          });
        }
      }
    })();
  }, [router.query.Id]);
  return (
    <Layout>
      <PostDetailContainer postQuery={postQueryOnClientSide || postQuery} />
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadPostsQuery>({
      query: READ_POSTS,
      variables: {
        input: {
          page: 1,
          all: true,
        },
      },
    });
    if (res.data.readPosts.posts) {
      paths = res.data.readPosts.posts.map((el) => ({
        params: { Id: String(el.id) },
      }));
    }
    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params?.Id) {
    return {
      notFound: true,
    };
  }
  const apolloClient = initializeApollo({}, '');
  const postId = context.params?.Id;
  const readPostQueryVariables: ReadPostQueryVariables = {
    input: { id: Number(String(postId)) },
  };
  const request = async () => {
    return await apolloClient.query<ReadPostQuery>({
      query: READ_POST,
      variables: readPostQueryVariables,
    });
  };
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  const postQuery = res?.data;
  return addApolloState(apolloClient, {
    props: { postQuery },
    revalidate: 86400,
  });
};
