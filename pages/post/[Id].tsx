import { READ_POST, READ_POSTS } from '@lib/graphql/query/postQuery';
import {
  ReadPostQuery,
  ReadPostQueryVariables,
  ReadPostsQuery,
} from '@lib/graphql/query/postQuery.generated';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import PostDetailComponent from '@components/post/detail/PostDetailComponent';
import { PostCategory } from 'types';
import { apolloClient } from '@modules/apollo';
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
      <PostDetailComponent postQueryOnStaticProps={postQueryOnStaticProps} />
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
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
      paths = res.data.readPosts.posts
        .filter((el) => el.category !== PostCategory.Data)
        .map((el) => ({
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
  const postId = context.params?.Id;
  const readPostQueryVariables: ReadPostQueryVariables = {
    input: { id: Number(String(postId)) },
  };
  const res = await apolloClient.query<ReadPostQuery>({
    query: READ_POST,
    variables: readPostQueryVariables,
  });
  const postQueryOnStaticProps = res?.data;
  return {
    props: { postQueryOnStaticProps },
    revalidate: 86400,
  };
};
