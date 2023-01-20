import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import PostWriteContainer from '@components/post/write/PostWriteContainer';
import WithHead from '@components/common/head/WithHead';

interface WriteProps {}

const Write: NextPage<WriteProps> = () => {
  return (
    <>
      <WithHead title="글쓰기 | 모두CBT" pageHeadingTitle="글쓰기페이지" />
      <Layout>
        <PostWriteContainer />
      </Layout>
    </>
  );
};

export default Write;

const WriteBlock = styled.div``;
