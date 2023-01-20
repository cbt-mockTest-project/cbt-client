import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import PostWriteContainer from '@components/post/write/PostWriteContainer';


interface PostEditProps {}

const PostEdit: NextPage<PostEditProps> = () => {
  return (
    <Layout>
      <PostWriteContainer />
    </Layout>
  );
};

export default PostEdit;

PostEdit.getInitialProps = async (ctx) => {
  return {};
};
