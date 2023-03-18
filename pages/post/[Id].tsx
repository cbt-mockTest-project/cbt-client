import Layout from '@components/common/layout/Layout';
import { READ_POST, READ_POSTS } from '@lib/graphql/user/query/postQuery';
import {
  ReadPostQuery,
  ReadPostQueryVariables,
  ReadPostsQuery,
} from '@lib/graphql/user/query/postQuery.generated';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import dynamic from 'next/dynamic';
import PostDetailViewSkeleton from '@components/post/detail/PostDetailViewSkeleton';
const PostDetailContainer = dynamic(
  () => import('@components/post/detail/PostDetailContainer'),
  { loading: () => <PostDetailViewSkeleton /> }
);
interface PostPageProps {
  postQueryOnStaticProps: ReadPostQuery;
}

const PostPage: NextPage<PostPageProps> = ({ postQueryOnStaticProps }) => {
  const pageTitle = postQueryOnStaticProps.readPost.post?.title;
  return (
    <>
      <WithHead
        title={`${pageTitle} | 모두CBT`}
        pageHeadingTitle={`${pageTitle} | 커뮤니티`}
      />
      <Layout>
        <PostDetailContainer postQueryOnStaticProps={postQueryOnStaticProps} />
      </Layout>
    </>
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
  const postQueryOnStaticProps = res?.data;
  return addApolloState(apolloClient, {
    props: { postQueryOnStaticProps },
    revalidate: 43200,
  });
};
