import Layout from '@components/common/layout/Layout';
import PostDetailContainer from '@components/post/PostDetailContainer';
import { NextPage } from 'next';
import React from 'react';

interface PostPageProps {}

const PostPage: NextPage<PostPageProps> = () => {
  return (
    <Layout>
      <PostDetailContainer />
    </Layout>
  );
};

export default PostPage;
