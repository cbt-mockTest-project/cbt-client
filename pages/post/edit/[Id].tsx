import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import PostWriteContainer from '@components/post/write/PostWriteContainer';
import WithHead from '@components/common/head/WithHead';

interface PostEditProps {}

const PostEdit: NextPage<PostEditProps> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 글수정"
        pageHeadingTitle="모두CBT 글수정페이지"
      />
      <Layout>
        <PostWriteContainer />
      </Layout>
    </>
  );
};

export default PostEdit;

PostEdit.getInitialProps = async (ctx) => {
  return {};
};
