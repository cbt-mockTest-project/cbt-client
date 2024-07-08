import { READ_POST, READ_POSTS } from '../../app/_lib/graphql/query/postQuery';
import {
  ReadPostQuery,
  ReadPostQueryVariables,
  ReadPostsQuery,
} from '../../app/_lib/graphql/query/postQuery.generated';
import {
  addApolloState,
  initializeApollo,
  useApollo,
} from '../../app/_modules/apollo';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import PostDetailComponent from '../../app/_components/post/detail/PostDetailComponent';
import { PostCategory } from '../../app/types';
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
  const apolloClient = initializeApollo({}, '');
  const postId = context.params?.Id;
  const readPostQueryVariables: ReadPostQueryVariables = {
    input: { id: Number(String(postId)) },
  };
  const res = await apolloClient.query<ReadPostQuery>({
    query: READ_POST,
    variables: readPostQueryVariables,
  });
  const postQueryOnStaticProps = res?.data;
  return addApolloState(apolloClient, {
    props: { postQueryOnStaticProps },
    revalidate: 86400,
  });
};
