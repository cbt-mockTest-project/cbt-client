import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import SearchQuestionComponent from '@components/searchQuestion/SearchQuestionComponent';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const SearchQuestionPageBlock = styled.div``;

const SearchQuestionPage: NextPage = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 문제검색기"
        pageHeadingTitle="모두CBT 문제검색 페이지"
      />
      <Layout>
        <SearchQuestionComponent />
      </Layout>
    </>
  );
};

export default SearchQuestionPage;
