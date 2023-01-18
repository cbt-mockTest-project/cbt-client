import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import PostWriteContainer from '@components/post/write/PostWriteContainer';

interface WriteProps {}

const Write: NextPage<WriteProps> = () => {
  return (
    <Layout>
      <PostWriteContainer />
    </Layout>
  );
};

export default Write;

const WriteBlock = styled.div``;
